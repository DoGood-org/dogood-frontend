// import { fetchFromApi } from '@/lib/api/apiFetcher';
// import { apiRoutes } from '@/lib/server/apiRoutes';
// import { ICurrentUser, User } from '@/types';

// export interface IAuthResponse {
//   ok?: boolean;
//   data?: Record<string, unknown>;

//   code?: string;
//   errorMessage: string;
//   user?: User;
//   status?: 200 | 403 | 401 | 500 | 400;
// }

// export interface ICurrentUserResponse {
//   status?: 'success' | 'error';
//   message?: string;
//   user: ICurrentUser | null;
// }
// export class AuthService {
//   //auth methods all where cookies magic
//   public login = async (email: string, password: string): Promise<any> => {
//     const response = await fetchFromApi(apiRoutes.auth.login, {
//       method: 'POST',
//       data: { email, password },
//     });
//     return response;
//   };
//   public refreshTokens = async (): Promise<any> => {
//     return await fetchFromApi<any>(apiRoutes.auth.refreshToken, {
//       method: 'POST',
//       // auth: true,
//     });
//   };
//   public verify = async (token: string): Promise<any> => {
//     console.log('AuthService verify called with token:', token);
//     return await fetchFromApi(`${apiRoutes.auth.verifyEmail(token)}`, {
//       method: 'GET',
//     });
//   };
//   public logout = async (): Promise<any> => {
//     fetchFromApi(apiRoutes.auth.logout, { method: 'POST' }).catch(() => {
//       console.log('Бекенд не відповів, але ми все одно виходимо');
//     });

//     // Одразу чистимо фронт
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('auth');
//       window.location.href = '/login';
//     }
//   };
//   public resendVerificationEmail = async (email: string): Promise<any> => {
//     console.log('Resend verification email called for email:', email);
//     return await fetchFromApi(apiRoutes.auth.resendVerification, {
//       method: 'POST',
//       data: { email },
//     });
//   };
//   public forgotPassword = async (email: string): Promise<any> => {
//     return await fetchFromApi(apiRoutes.auth.forgotPassword, {
//       method: 'POST',
//       data: { email },
//     });
//   };
//   public resetPassword = async (
//     resetToken: string,
//     newPassword: string
//   ): Promise<any> => {
//     return await fetchFromApi(apiRoutes.auth.resetPassword(resetToken), {
//       method: 'POST',
//       data: { password: newPassword },
//     });
//   };

//   //proxy everything else
//   public register = async (
//     email: string,
//     password: string,
//     name: string,
//     lang: string = 'en'
//   ): Promise<any> => {
//     return await fetchFromApi<IAuthResponse>(apiRoutes.auth.signup, {
//       method: 'POST',
//       data: { name, password, email },
//       params: { lang }, // ?lang=en
//     });
//   };
//   public currentUser = async (): Promise<any> => {
//     const curr = await fetchFromApi<any>(apiRoutes.user.current, {
//       method: 'GET',
//       // auth: true,
//     });
//     console.log('Current user response from service:', curr);
//     return curr;
//   };
//   public registerCompany = async (
//     name: string,
//     email: string,
//     password: string,
//     organizationName: string
//   ): Promise<any> => {
//     return await fetchFromApi<any>(apiRoutes.organizations.signup, {
//       method: 'POST',
//       data: { name, email, password, organizationName },
//     });
//   };
// }
import { fetchFromApi } from '@/lib/api/apiFetcher';
import { apiRoutes } from '@/lib/server/apiRoutes';
import { ICurrentUser } from '@/types';

export interface IAuthResponse {
  ok: boolean;
  user?: ICurrentUser | null;
  message?: string;
  errorMessage?: string;
}

export interface ICurrentUserResponse {
  ok: boolean;
  user?: ICurrentUser | null;
}

/**
 * DTOs
 */
export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  email: string;
  password: string;
  name: string;
};

export type ResetPasswordDTO = {
  token: string;
  password: string;
};

export type RegisterCompanyDTO = {
  name: string;
  email: string;
  password: string;
  organizationName: string;
};

/**
 * AUTH SERVICE
 */
export class AuthService {
  /**
   * GUEST METHODS
   */

  public login = (data: LoginDTO): Promise<IAuthResponse> => {
    return fetchFromApi<IAuthResponse>(apiRoutes.auth.login, {
      method: 'POST',
      data,
      auth: false,
    });
  };

  public register = (data: RegisterDTO): Promise<IAuthResponse> => {
    return fetchFromApi<IAuthResponse>(apiRoutes.auth.signup, {
      method: 'POST',
      data,
      auth: false,
    });
  };

  public verify = (token: string): Promise<IAuthResponse> => {
    return fetchFromApi<IAuthResponse>(apiRoutes.auth.verifyEmail(token), {
      method: 'GET',
      auth: false,
    });
  };

  public forgotPassword = (email: string): Promise<IAuthResponse> => {
    return fetchFromApi<IAuthResponse>(apiRoutes.auth.forgotPassword, {
      method: 'POST',
      data: { email },
      auth: false,
    });
  };

  public resetPassword = (data: ResetPasswordDTO): Promise<IAuthResponse> => {
    return fetchFromApi<IAuthResponse>(
      apiRoutes.auth.resetPassword(data.token),
      {
        method: 'POST',
        data: { password: data.password },
        auth: false,
      }
    );
  };

  public resendVerificationEmail = (email: string): Promise<IAuthResponse> => {
    return fetchFromApi<IAuthResponse>(apiRoutes.auth.resendVerification, {
      method: 'POST',
      data: { email },
      auth: false,
    });
  };

  public currentUser = (): Promise<ICurrentUserResponse> => {
    return fetchFromApi<ICurrentUserResponse>(apiRoutes.user.current, {
      method: 'GET',
      auth: true,
    });
  };

  public logout = (): Promise<IAuthResponse> => {
    return fetchFromApi<IAuthResponse>(apiRoutes.auth.logout, {
      method: 'POST',
      auth: true,
    });
  };

  /**
   * COMPANY REGISTRATION
   */

  public registerCompany = (
    data: RegisterCompanyDTO
  ): Promise<IAuthResponse> => {
    return fetchFromApi<IAuthResponse>(apiRoutes.organizations.signup, {
      method: 'POST',
      data,
      auth: false,
    });
  };
}
