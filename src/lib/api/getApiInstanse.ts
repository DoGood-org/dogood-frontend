import { AxiosInstance } from 'axios';
import { apiAuth, apiGuest } from '../api';
import { apiServerAuth, apiServerGuest } from '../server/api.server';

export const getApiInstance = (auth: boolean): AxiosInstance => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return auth ? apiServerAuth : apiServerGuest;
  }

  return auth ? apiAuth : apiGuest;
};
