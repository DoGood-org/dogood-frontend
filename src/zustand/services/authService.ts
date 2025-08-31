import { fetchFromApi } from '@/lib/apiFetcher';
import { User } from '@/types';

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export class AuthService {
  public login = async (
    email: string,
    password: string
  ): Promise<IAuthResponse> => {
    const response = await fetchFromApi<IAuthResponse>('auth/login', {
      method: 'POST',
      data: { email, password },

      auth: true,
    });

    return response;
  };
  public logout = async (): Promise<void> => {
    await fetchFromApi('auth/logout', {
      method: 'POST',
      auth: true,
    });
  };
  public currentUser = async (): Promise<User> => {
    const response = await fetchFromApi<User>('auth/current-user', {
      method: 'GET',
      auth: true,
    });

    return response;
  };
  public register = async (
    email: string,
    password: string,
    name: string
  ): Promise<IAuthResponse> => {
    const response = await fetchFromApi<IAuthResponse>('auth/register', {
      method: 'POST',
      data: { email, password, name },
      auth: true,
    });

    return response;
  };
  public registerCompany = async (
    name: string,
    email: string,
    password: string,
    organizationName: string
  ): Promise<IAuthResponse> => {
    const response = await fetchFromApi<IAuthResponse>(
      'auth/register-company',
      {
        method: 'POST',
        data: { name, email, password, organizationName },
        auth: true,
      }
    );

    return response;
  };
  public refreshTokens = async (): Promise<void> => {
    await fetchFromApi('auth/refresh-token', {
      method: 'POST',
      auth: true,
    });
  };
}
