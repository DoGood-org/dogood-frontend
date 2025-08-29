import axios from 'axios';

const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const apiGuest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const api = {
  auth: apiAuth,
  guest: apiGuest,
};

export default api;
