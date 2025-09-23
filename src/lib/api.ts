import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const FRONT_END_ORIGIN = (): string => {
  const appLocal = process.env.API_URL_INTERNAL;
  const appPublic = process.env.BASE_URL;

  let app = '';
  if (process.env.NODE_ENV === 'production') {
    if (appPublic) app = appPublic;
  } else {
    app = appLocal || 'http://localhost:3000';
  }

  return app;
};

const BACKEND = isBrowser
  ? process.env.NEXT_PUBLIC_API_URL
  : FRONT_END_ORIGIN();

const guestBase = BACKEND ? `${BACKEND}/` : '/api'; // public routes (login/logout/refresh/signup)
const authBase = BACKEND ? `${BACKEND}/api/proxy` : '/api/proxy'; // protected routes via server proxy

const apiAuth = axios.create({
  baseURL: authBase,
  withCredentials: true,
});

const apiGuest = axios.create({
  baseURL: guestBase,
  withCredentials: false,
});

const api = {
  auth: apiAuth,
  guest: apiGuest,
};

export default api;
