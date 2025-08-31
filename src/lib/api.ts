import axios from 'axios';
const apiUrl = '/api';

const getBaseURL = () => {
  if (typeof window !== 'undefined') return '/api'; // client → Next rewrite
  if (process.env.API_URL_INTERNAL) return process.env.API_URL_INTERNAL;
  if (process.env.BASE_URL) return process.env.BASE_URL;

  return 'http://localhost:3000/api';
};

const apiAuth = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

const apiGuest = axios.create({
  baseURL: getBaseURL(),
  withCredentials: false,
});

const api = {
  auth: apiAuth,
  guest: apiGuest,
};

export default api;

