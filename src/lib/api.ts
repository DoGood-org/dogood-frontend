'use client';

import axios from 'axios';
import { getApiInstance } from './api/getApiInstanse';

// Базові інстанси
export const apiAuth = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
});

export const apiGuest = axios.create({
  baseURL: '/api/proxy',
  // withCredentials: true,
});

export const api = {
  auth: apiAuth,
  guest: apiGuest,
};

// універсальний fetch через проксі з автоматичним refresh
export async function fetchWithRefresh<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  auth = true
): Promise<T> {
  try {
    const instance = getApiInstance(auth);
    const res = await instance.request<T>({
      url: path,
      method,
      data,
    });
    return res.data;
  } catch (err: any) {
    // axios помилка 401 → можливо, accessToken протух
    if (err.response?.status === 401 && auth) {
      // спробуємо повторно (refresh обробляється на сервері через proxy)
      const instance = getApiInstance(auth);
      const retry = await instance.request<T>({
        url: path,
        method,
        data,
      });
      return retry.data;
    }
    throw err;
  }
}
// 'use client';

// import axios, { AxiosInstance } from 'axios';

// export const apiGuest = axios.create({
//   baseURL: '/api/proxy',
//   withCredentials: true,
// });

// export const apiAuth = axios.create({
//   baseURL: '/api/proxy',
//   withCredentials: true,
// });

// // Черга запитів, що чекають на refresh
// type QueueItem = {
//   resolve: () => void;
//   reject: (err: unknown) => void;
// };

// let isRefreshing = false;
// let failedQueue: QueueItem[] = [];

// function processQueue(error: unknown): void {
//   failedQueue.forEach((item) => {
//     if (error) {
//       item.reject(error);
//     } else {
//       item.resolve();
//     }
//   });
//   failedQueue = [];
// }

// function addRefreshInterceptor(instance: AxiosInstance): void {
//   instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       // Тільки 401, і тільки один раз
//       if (error.response?.status !== 401 || originalRequest._retry) {
//         return Promise.reject(error);
//       }

//       // Якщо вже йде refresh — ставимо в чергу
//       if (isRefreshing) {
//         return new Promise<void>((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => instance(originalRequest))
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // Refresh через проксі (httpOnly cookie — серверна логіка)
//         await apiGuest.post('/auth/refresh-token');
//         isRefreshing = false;
//         processQueue(null);
//         return instance(originalRequest);
//       } catch (refreshError) {
//         isRefreshing = false;
//         processQueue(refreshError);
//         if (typeof window !== 'undefined') {
//           window.location.href = '/login';
//         }
//         return Promise.reject(refreshError);
//       }
//     }
//   );
// }

// // Додаємо interceptor лише на apiAuth (не apiGuest — щоб не зациклити refresh)
// addRefreshInterceptor(apiAuth);

// export const api = {
//   auth: apiAuth,
//   guest: apiGuest,
// };
