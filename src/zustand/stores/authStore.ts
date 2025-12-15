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
import { toast } from 'react-toastify';

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
  verify: (token: string) => Promise<IAuthResponse>;
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
  resetPassword: (
    resetToken: string,
    newPassword: string
  ) => Promise<IAuthResponse>;

  nextResendAt: number | null;
  setNextResendAt: (ts: number | null) => void;
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
      nextResendAt: null,
      setNextResendAt: (ts): any => set({ nextResendAt: ts }),

      login: async (email, password): Promise<IAuthResponse> => {
        try {
          const res = await service.login(email, password);

          if (res.ok) {
            toast.success('Login successful');
            set({
              status: 'authorized',
              error: null,
              isLoggedIn: true,
            });
            return res;
          }
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
            errorMessage: 'Login failed',
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
          const res = await service.register(email, password, name);
          if (!res.ok) {
            toast.error(
              'Sign up failed: ' + (res.errorMessage || 'Something went wrong')
            );
          }
          if (res.ok) {
            toast.success('Registration successful');
            set({ status: 'verifying', error: null, beMessage: res.message });
            return res;
          }
          return res;
        } catch (error) {
          const { message } = (error as any) || {};
          toast.error('Registration failed');
          set({
            status: 'apiError',
            error: 'Register failed',
            beMessage: message,
          });
          return {
            ok: false,
            status: 500,
            errorMessage: 'Register failed',
          };
        }
      },

      registerCompany: async (
        name,
        email,
        password,
        organizationName
      ): Promise<void> => {
        try {
          const res = await service.registerCompany(
            name,
            email,
            password,
            organizationName
          );
          if (!res.ok) {
            toast.error(
              'Login failed: ' + (res.errorMessage || 'Something went wrong')
            );
          }
          if (res.ok) {
            toast.success('Organization registration successful');
            set({ status: 'verifying', error: null });
            return;
          }
        } catch (error) {
          const { message } = (error as any) || {};
          toast.error('Organization registration failed');
          set({
            status: 'apiError',
            error: 'Register company failed',
            beMessage: message,
          });
          return;
        }
      },
      verify: async (token): Promise<IAuthResponse> => {
        try {
          const res = await service.verify(token);
          if (res.ok) {
            toast.success('Email verification successful');
            set({
              isEmailVerified: true,
              status: 'authenticated',
              error: null,
            });
          }
        } catch (error) {
          const { message } = (error as any) || {};
          toast.error('Verification failed');
          set({
            status: 'apiError',
            error: 'Verification failed',
            isEmailVerified: false,
            beMessage: message,
          });
          return {
            ok: false,
            status: 500,
            errorMessage: 'Verification failed',
          };
        }
        return { ok: true, errorMessage: 'Verification succeeded' };
      },
      currentUser: async (): Promise<ICurrentUserResponse | null> => {
        set({ status: 'loading', error: null });
        try {
          const res = await service.currentUser();
          if (!res.ok) {
            throw new Error('Failed to fetch current user');
          }

          const { user, status, message } = res;
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
          const res: any = await get().currentUser();
          if (res && res.user) {
            set({
              status: 'authorized',
              error: null,
              isLoggedIn: true,
            });
            return;
          }
        } catch (e: any) {
          console.error('Token refresh failed:', e);
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
        const COOLDOWN_MS = 60_000;

        const next = get().nextResendAt;
        if (next && Date.now() < next) return;

        try {
          const res = await service.resendVerificationEmail(email);

          if (res.ok) {
            toast.success('Verification email resent successfully');

            set({ nextResendAt: Date.now() + COOLDOWN_MS });
            return;
          }

          toast.error(res.errorMessage || 'Resend verification email failed');
        } catch (e) {
          console.error('Resend verification email failed:', e);
          toast.error('Resend verification email failed');
        }
      },
      requestToResetPassword: async (email: string): Promise<IAuthResponse> => {
        try {
          const res = await service.forgotPassword(email);
          if (res.ok) {
            return res;
          }
          return res;
        } catch (e) {
          console.error('Request to reset password failed:', e);
          throw e;
        }
      },
      resetPassword: async (
        resetToken: string,
        newPassword: string
      ): Promise<IAuthResponse> => {
        try {
          const res = await service.resetPassword(resetToken, newPassword);
          if (res.ok) {
            toast.success('Password reset successful');
            return res;
          }
          return res;
        } catch (e) {
          toast.error('Reset password failed');
          console.error('Reset password failed:', e);
          return {
            ok: false,
            status: 500,
            errorMessage: 'Reset password failed',
          };
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
        nextResendAt: s.nextResendAt,
      }),
    }
  )
);
