'use client';

import { authStore } from '@/zustand/stores/authStore';
// NEW: додано AxiosError для isAuthFailure
import axios, { AxiosError, AxiosInstance } from 'axios';

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
// NEW: справжня відмова авторизації, а не збій мережі чи 5xx
function isAuthFailure(err: unknown): boolean {
  const status = (err as AxiosError)?.response?.status;
  return status === 401 || status === 403;
}

function addRefreshInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // OLD:
      // if (error.response?.status !== 401 || originalRequest._retry) {
      //   return Promise.reject(error);
      // }
      // NEW: додано перевірку, що config існує (скасований запит)

      if (
        !originalRequest ||
        error.response?.status !== 401 ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }
      // NEW: кожен запит повторюємо лише один раз (і ті, що з черги)
      // Кожен запит повторюємо лише один раз
      originalRequest._retry = true;

      // OLD:
      // if (isRefreshing) {
      //   return new Promise<void>((resolve, reject) => {
      //     failedQueue.push({ resolve, reject });
      //   })
      //     .then(() => instance(originalRequest))
      //     .catch((err) => Promise.reject(err));
      // }
      //
      // originalRequest._retry = true;
      // isRefreshing = true;

      // NEW:
      // Refresh уже триває: чекаємо в черзі, потім повторюємо запит
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => instance(originalRequest));
      }

      isRefreshing = true;

      // OLD:
      // try {
      //   await apiGuest.post('/auth/refresh-token');
      //
      //   await authStore.getState().currentUser({ silent: true });
      //
      //   isRefreshing = false;
      //   processQueue(null);
      //
      //   return instance(originalRequest);
      // } catch (refreshError) {
      //   isRefreshing = false;
      //   processQueue(refreshError);
      //
      //   authStore.setState({
      //     user: null,
      //     isLoggedIn: false,
      //     status: 'idle',
      //   });
      //
      //   if (typeof window !== 'undefined') {
      //     const currentPath = window.location.pathname + window.location.search;
      //     if (!currentPath.includes('/login')) {
      //       window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
      //     }
      //   }
      //   return Promise.reject(refreshError);
      // }

      // NEW:

      try {
        await apiGuest.post('/auth/refresh-token');

        processQueue(null);
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // Розлогінюємо тільки при справжній відмові (401/403),
        // а не коли бек недоступний (мережа, 502, 503, таймаут)
        if (isAuthFailure(refreshError)) {
          authStore.setState({
            user: null,
            isLoggedIn: false,
            status: 'idle',
          });

          if (typeof window !== 'undefined') {
            const currentPath =
              window.location.pathname + window.location.search;
            if (!currentPath.includes('/login')) {
              window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
            }
          }
        }

        return Promise.reject(refreshError);
      } finally {
        // NEW: прапорець скидається завжди
        isRefreshing = false;
      }
    }
  );
}

addRefreshInterceptor(apiAuth);

export const api = {
  auth: apiAuth,
  guest: apiGuest,
};
