import { AxiosInstance } from 'axios';
import { apiClientAuth, apiClientGuest } from './api.client';
import { apiServerAuth, apiServerGuest } from '../server/api.server';

export const getApiInstance = (auth: boolean): AxiosInstance => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return auth ? apiServerAuth : apiServerGuest;
  }

  return auth ? apiClientAuth : apiClientGuest;
};
