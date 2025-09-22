import axios from 'axios';

// const getBaseURL = (): string => {
//   if (typeof window !== 'undefined') return '/api'; // client → Next rewrite
//   if (process.env.API_URL_INTERNAL) return process.env.API_URL_INTERNAL;
//   if (process.env.BASE_URL) return process.env.BASE_URL;

//   return `${process.env.API_URL}/api`;
// };
const getBaseURL = (): string => {
  if (typeof window !== 'undefined') return '';
  const appLocal = process.env.API_URL_INTERNAL;
  const appPublic = process.env.BASE_URL;
  let app = '';
  if (process.env.NODE_ENV === 'production') {
    if (appPublic) app = appPublic;

    if (!app)
      throw new Error('No BASE_URL or API_URL_INTERNAL defined in production');
    return app;
  }
  app = appLocal || 'http://localhost:3000';

  return app;
};

const ORIGIN = getBaseURL();
const guestBase = ORIGIN ? `${ORIGIN}/` : '/api'; // public routes (login/logout/refresh/signup)
const authBase = ORIGIN ? `${ORIGIN}/api/proxy` : '/api/proxy'; // protected routes via server proxy

const apiAuth = axios.create({
  baseURL: authBase,
  withCredentials: true,
});

const apiGuest = axios.create({
  baseURL: guestBase,
  withCredentials: true,
});

const api = {
  auth: apiAuth,
  guest: apiGuest,
};

export default api;
