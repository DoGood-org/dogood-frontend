'use client';
// export const authStore = create<AuthState>((set) => ({
//   isLoggedIn: true,
//   // user: null,
//   user: userExample,
//   login: (userData): void => set({ user: userData, isLoggedIn: true }),
//   logout: (): void => set({ user: null, isLoggedIn: false }),
// }));

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ICurrentUser, User } from '@/types';
import {
  AuthService,
  IAuthResponse,
  ICurrentUserResponse,
} from '@/zustand/services/authService';

type Status =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'verifying'
  | 'apiError'
  | 'refreshing'
  | 'authorized'
  | 'forbidden'; // 403 from API;

type TAuthState = {
  user: User | ICurrentUser | null;
  isLoggedIn: boolean;
  isEmailVerified: boolean;

  status: Status;
  beMessage: string;
  error: string | null;
  login: (email: string, password: string) => Promise<IAuthResponse>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<IAuthResponse>;
  verify: (token: string) => Promise<void>;
  registerCompany: (
    name: string,
    email: string,
    password: string,
    organizationName: string
  ) => Promise<void>;
  currentUser: (options?: {
    silent?: boolean;
  }) => Promise<ICurrentUserResponse | null>;
  refresh: () => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  requestToResetPassword: (email: string) => Promise<IAuthResponse>;
  resetPassword: (resetToken: string, newPassword: string) => Promise<void>;
};
type Step =
  | null
  | 'proceedToUserSpace'
  | 'proceedToLogin'
  | 'resetPassword'
  | 'forgotPasswordEnterEmail'
  | 'verification'
  | 'resendLink'
  | 'mistakeInEmail'
  | 'mistakeApi';
export const useAuthFlow = create<{ step: Step; setStep: (s: Step) => void }>(
  (set) => ({
    step: null,
    setStep: (s): void => set({ step: s }),
  })
);

const service = new AuthService();

export const authStore = create<TAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isEmailVerified: false,
      status: 'idle',
      error: null,
      beMessage: '',
      login: async (email, password): Promise<IAuthResponse> => {
        try {
          const res = await service.login(email, password);
          console.log('Login response from service should be short user:', res);

          return res;
        } catch (error) {
          console.error('Login failed:', error);
          set({
            status: 'apiError',
            error: 'Login failed',
            user: null,
            isLoggedIn: false,
          });
          return {
            ok: false,
            status: 500,
            message: 'Login failed',
          };
        }
      },

      logout: async (): Promise<void> => {
        try {
          await service.logout();
        } catch (e) {
          console.error('Logout failed:', e);
        }
        set({
          user: null,
          isLoggedIn: false,
          status: 'idle',
          error: null,
        });
      },

      register: async (email, password, name): Promise<IAuthResponse> => {
        try {
          return await service.register(email, password, name);
        } catch (error) {
          const { message } = (error as any) || {};
          console.error('Register failed:', error);
          set({
            status: 'apiError',
            error: 'Register failed',
            beMessage: message,
          });
          return {
            ok: false,
            status: 500,
            message: 'Register failed',
          };
        }
      },

      registerCompany: async (
        name,
        email,
        password,
        organizationName
      ): Promise<void> => {
        set({ status: 'loading', error: null });
        try {
          const { status, message } = await service.registerCompany(
            name,
            email,
            password,
            organizationName
          );
          if (status === 'success') {
            set({ status: 'verifying', error: null, beMessage: message });
          }
        } catch (error) {
          const { message } = (error as any) || {};
          console.error('Register company failed:', error);
          set({
            status: 'apiError',
            error: 'Register company failed',
            beMessage: message,
          });
          return;
        }
      },
      verify: async (token): Promise<void> => {
        try {
          const { status } = await service.verify(token);
          if (status === 'success') {
            set({
              isEmailVerified: true,
              status: 'authenticated',
              error: null,
            });
          }
        } catch (error) {
          const { message } = (error as any) || {};
          console.error('Verification failed:', error);
          set({
            status: 'apiError',
            error: 'Verification failed',
            isEmailVerified: false,
            beMessage: message,
          });
          return;
        }
      },
      currentUser: async (): Promise<ICurrentUserResponse | null> => {
        set({ status: 'loading', error: null });
        try {
          const { data, ok } = await service.currentUser();
          if (!ok) {
            throw new Error('Failed to fetch current user');
          }

          const { user, status, message } = data;
          set({
            user: user as ICurrentUser,
            status: 'authorized',
            error: null,
            isLoggedIn: true,
            beMessage: message,
          });
          return { user, status, message };
        } catch (error) {
          console.error('Fetching current user failed:', error);
          set({
            status: 'forbidden',
            error: 'Fetching current user failed proceed to login',
            user: null,
            isLoggedIn: false,
            isEmailVerified: false,
          });
          return null;
        }
      },
      refresh: async (): Promise<void> => {
        try {
          set({ status: 'refreshing', error: null });
          await get().currentUser();
        } catch (e: any) {
          set({
            status: 'apiError',
            error: e?.message ?? 'Refresh failed',
            user: null,
            isLoggedIn: false,
          });
          // fallback: force logout if refresh fails

          await get().logout();
        }
      },
      resendVerificationEmail: async (email: string): Promise<void> => {
        try {
          await service.resendVerificationEmail(email);
        } catch (e) {
          console.error('Resend verification email failed:', e);
        }
      },
      requestToResetPassword: async (email: string): Promise<IAuthResponse> => {
        console.log('Requesting password reset for email:', email);
        try {
          return await service.forgotPassword(email);
        } catch (e) {
          console.error('Request to reset password failed:', e);
          throw e;
        }
      },
      resetPassword: async (
        resetToken: string,
        newPassword: string
      ): Promise<void> => {
        console.log('Resetting password with token:', resetToken);
        try {
          await service.resetPassword(resetToken, newPassword);
        } catch (e) {
          console.error('Reset password failed:', e);
        }
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: (): string | null => null,
              setItem: (): void => {},
              removeItem: (): void => {},
            }
      ),
      partialize: (s) => ({
        user: s.user,
        isLoggedIn: s.isLoggedIn,
      }),
    }
  )
);
