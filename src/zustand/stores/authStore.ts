'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-toastify';

import type { ICurrentUser } from '@/types';
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
  | 'forbidden';

type TAuthState = {
  user: ICurrentUser | null;
  isLoggedIn: boolean;
  isEmailVerified: boolean;

  status: Status;
  error: string | null;
  beMessage: string;

  nextResendAt: number | null;
  setNextResendAt: (ts: number | null) => void;

  login: (email: string, password: string) => Promise<IAuthResponse>;
  logout: () => Promise<void>;

  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<IAuthResponse>;

  verify: (token: string) => Promise<IAuthResponse>;

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
};

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
      setNextResendAt: (ts: number | null): void => {
        set({ nextResendAt: ts });
      },

      login: async (email, password): Promise<IAuthResponse> => {
        try {
          const res = await service.login({ email, password });

          if (res.ok) {
            toast.success('Login successful');

            set({
              status: 'authorized',
              isLoggedIn: true,
              error: null,
              user: res.user ?? null,
            });
          }

          return res;
        } catch {
          set({
            status: 'apiError',
            error: 'Login failed',
            isLoggedIn: false,
            user: null,
          });

          return {
            ok: false,
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
          const res = await service.register({ email, password, name });

          if (res.ok) {
            toast.success('Registration successful');

            set({
              status: 'verifying',
              error: null,
              beMessage: res.message ?? '',
            });
          } else {
            toast.error(res.errorMessage || 'Registration failed');
          }

          return res;
        } catch {
          set({
            status: 'apiError',
            error: 'Register failed',
          });

          return {
            ok: false,
            errorMessage: 'Register failed',
          };
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

          return res;
        } catch {
          set({
            status: 'apiError',
            error: 'Verification failed',
            isEmailVerified: false,
          });

          return {
            ok: false,
            errorMessage: 'Verification failed',
          };
        }
      },

      currentUser: async (
        options = {}
      ): Promise<ICurrentUserResponse | null> => {
        set({ status: options.silent ? get().status : 'loading', error: null });
        try {
          const res = await service.currentUser();
          if (res.ok) {
            set({
              status: 'authorized',
              isLoggedIn: true,
              user: res.user ?? null,
            });
            return res;
          }
          return null;
        } catch {
          // set({ status: 'idle' });
          return null;
        }
      },

      refresh: async (): Promise<void> => {
        await get().currentUser();
      },

      resendVerificationEmail: async (email: string): Promise<void> => {
        const COOLDOWN_MS = 60_000;

        const next = get().nextResendAt;
        if (next && Date.now() < next) return;

        try {
          const res = await service.resendVerificationEmail(email);

          if (res.ok) {
            toast.success('Verification email resent');

            set({
              nextResendAt: Date.now() + COOLDOWN_MS,
            });
          } else {
            toast.error(res.errorMessage || 'Failed to resend email');
          }
        } catch {
          toast.error('Resend verification failed');
        }
      },

      requestToResetPassword: async (email: string): Promise<IAuthResponse> => {
        try {
          return await service.forgotPassword(email);
        } catch {
          return {
            ok: false,
            errorMessage: 'Request failed',
          };
        }
      },

      resetPassword: async (
        resetToken: string,
        newPassword: string
      ): Promise<IAuthResponse> => {
        try {
          const res = await service.resetPassword({
            token: resetToken,
            password: newPassword,
          });

          if (res.ok) {
            toast.success('Password reset successful');
          }

          return res;
        } catch {
          toast.error('Reset password failed');

          return {
            ok: false,
            errorMessage: 'Reset password failed',
          };
        }
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.localStorage
          : {
              getItem: (_name: string): string | null => null,
              setItem: (_name: string, _value: string): void => {},
              removeItem: (_name: string): void => {},
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
