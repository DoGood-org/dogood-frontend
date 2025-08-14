import axios from 'axios';

const fetcher = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // якщо треба відправляти cookie
});

// Інтерцептор для обробки помилок
fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);

export default fetcher;
