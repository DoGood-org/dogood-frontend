'use client';

import axios, { AxiosInstance } from 'axios';

export const apiGuest = axios.create({
  baseURL: '/api/proxy',
});

export const apiAuth = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
});

type QueueItem = {
  resolve: () => void;
  reject: (err: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

function processQueue(error: unknown): void {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve();
    }
  });
  failedQueue = [];
}

function addRefreshInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => instance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiGuest.post('/auth/refresh-token');
        isRefreshing = false;
        processQueue(null);
        return instance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname + window.location.search;
          if (!currentPath.includes('/login')) {
            window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
          }
        }
        return Promise.reject(refreshError);
      }
    }
  );
}

addRefreshInterceptor(apiAuth);

export const api = {
  auth: apiAuth,
  guest: apiGuest,
};
