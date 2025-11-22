import { fetchFromApi } from '@/lib/apiFetcher';
import { apiRoutes } from '@/lib/server/apiRoutes';
import { ICurrentUser, User } from '@/types';

export interface IAuthResponse {
  ok: boolean;
  data: {
    message: string;
    user?: User;
    status?: 'success' | 'error';
  };
}

// interface IRegisterResponse {
//   status?: 'success' | 'error';
//   message: string;
// }

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
export class AuthService {
  //public methods
  public login = async (email: string, password: string): Promise<any> => {
    const response = await fetchFromApi(apiRoutes.auth.login, {
      method: 'POST',
      data: { email, password },
    });
    console.log('Login response:', response);
    return response;
  };
  public register = async (
    email: string,
    password: string,
    name: string
  ): Promise<any> => {
    return await fetchFromApi<IAuthResponse>(apiRoutes.auth.signup, {
      method: 'POST',
      data: { email, password, name },
    });
  };
  public registerCompany = async (
    name: string,
    email: string,
    password: string,
    organizationName: string
  ): Promise<any> => {
    return await fetchFromApi<any>(apiRoutes.organizations.signup, {
      method: 'POST',
      data: { name, email, password, organizationName },
      auth: true,
    });
  };
  public refreshTokens = async (): Promise<any> => {
    return await fetchFromApi<any>(apiRoutes.auth.refreshToken, {
      method: 'POST',
      auth: true,
    });
  };
  public verify = async (token: string): Promise<any> => {
    return await fetchFromApi(`${apiRoutes.auth.verifyEmail(token)}`, {
      method: 'GET',
    });
  };

  //protected
  public logout = async (): Promise<any> => {
    return await fetchFromApi(apiRoutes.user.logout, {
      method: 'POST',
      auth: true,
    });
  };
  public currentUser = async (): Promise<any> => {
    const curr = await fetchFromApi<any>(apiRoutes.user.current, {
      method: 'GET',
      auth: true,
    });
    console.log('Current user response:', curr);
    return curr;
  };
}
