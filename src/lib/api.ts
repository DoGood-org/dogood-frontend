'use client';
import axios from 'axios';

// const NEXT_API = '/api/'; // Next.js API routes

// const BASE_URL = process.env.BASE_URL;
// const PROXY = () => {
//   if (process.env.NODE_ENV === 'development') {
//     return 'http://localhost:3000/';
//   } else if (process.env.NODE_ENV === 'production') {
//     return BASE_URL;
//   }
//   return null;
// };
// const BACKEND = process.env.NEXT_PUBLIC_API_URL;
// const guestBase = BASE_URL ?? `${BASE_URL}api/`; // public routes (login/logout/refresh/signup)
// const authBase = PROXY() ?? `${PROXY()}api/proxy`; // protected routes via server proxy

const apiAuth = axios.create({
  baseURL: '/api/proxy',
  withCredentials: true,
});

const apiGuest = axios.create({
  baseURL: '/api/auth',
  withCredentials: true,
});

const api = {
  auth: apiAuth,
  guest: apiGuest,
};

export default api;
