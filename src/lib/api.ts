import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiAuth = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const apiGuest = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
});

const api = {
  auth: apiAuth,
  guest: apiGuest,
};

export default api;
