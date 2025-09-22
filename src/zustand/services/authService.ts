import { fetchFromApi } from '@/lib/apiFetcher';
import { ICurrentUser, User } from '@/types';

export interface IAuthResponse {
  status: 'success' | 'error';
  message: string;
  user?: User;
}

interface IRegisterResponse {
  status?: 'success' | 'error';
  message: string;
}

// interface ICurrentUser extends User {
//   avatar: string | null;
//   bio: string | null;
//   birthDate: string | null;
//   createdAt: string;
//   email: string;
//   gender: string | null;
//   hostedTasks: [];
//   isEmailVerified: true;
//   joinedTasks: [];
//   locationId: null;
//   name: string;
//   organizations: [];
//   paymentOptions: [];
//   phoneNumber: string | null;
//   reviewsReceived: [];
//   reviewsWritten: [];
//   siteRole: string;
//   updatedAt: string;
//   userSettings: null;
// }
export interface ICurrentUserResponse {
  status?: 'success' | 'error';
  message?: string;
  user: ICurrentUser;
}
interface IRefreshResponse {
  status?: 'success' | 'error';
  message?: string;
}

type IVerifyResponse = IRegisterResponse;

export class AuthService {
  public login = async (
    email: string,
    password: string
  ): Promise<IAuthResponse> => {
    const { user, status, message } = await fetchFromApi<IAuthResponse>(
      '/auth/login',
      {
        method: 'POST',
        data: { email, password },
        auth: true,
      }
    );
    return { user, status, message };
  };
  public logout = async (): Promise<void> => {
    return await fetchFromApi('auth/logout', {
      method: 'POST',
      auth: true,
    });
  };
  public currentUser = async (): Promise<ICurrentUserResponse> => {
    return await fetchFromApi<ICurrentUserResponse>('auth/current-user', {
      method: 'GET',
      auth: true,
    });
  };
  public register = async (
    email: string,
    password: string,
    name: string
  ): Promise<IAuthResponse> => {
    return await fetchFromApi<IAuthResponse>('auth/signup', {
      method: 'POST',
      data: { email, password, name },
    });
  };
  public registerCompany = async (
    name: string,
    email: string,
    password: string,
    organizationName: string
  ): Promise<IAuthResponse> => {
    return await fetchFromApi<IAuthResponse>('/auth/signup/organization', {
      method: 'POST',
      data: { name, email, password, organizationName },
    });
  };
  public refreshTokens = async (): Promise<IRefreshResponse> => {
    return await fetchFromApi<IRefreshResponse>('auth/refresh-token', {
      method: 'POST',
      auth: true,
    });
  };
  public verify = async (token: string): Promise<IVerifyResponse> => {
    return await fetchFromApi(`auth/verify-email/${token}`, {
      method: 'GET',
    });
  };
}
