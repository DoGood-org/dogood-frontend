import { fetchFromApi } from '@/lib/api/apiFetcher';
import { apiRoutes } from '@/lib/server/apiRoutes';
import {
  IBannedUser,
  ICurrentUser,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from '@/types';

export interface IAuthResponse {
  ok: boolean;
  user?: ICurrentUser | null;
  bannedUser?: IBannedUser;
  message?: string;
  status?: number;
  errorMessage?: string;
}

export interface ICurrentUserResponse {
  ok: boolean;
  user?: ICurrentUser | null;
}

export class AuthService {
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
}
