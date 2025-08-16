import axios from 'axios';

export const fetcher = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

fetcher.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Unknown error';
    return Promise.reject(new Error(msg));
  }
);
