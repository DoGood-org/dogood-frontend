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
  register: (email: string, password: string, name: string) => Promise<void>;
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
};
type Step =
  | null
  | 'proceedToUserSpace'
  | 'proceedToLogin'
  | 'forgotPassword'
  | 'forgotEmail'
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
      isLoggedIn: true,
      isEmailVerified: false,
      status: 'idle',
      error: null,
      beMessage: '',
      login: async (email, password): Promise<IAuthResponse> => {
        set({ status: 'loading', error: null });
        try {
          const res = await service.login(email, password);
          const { user, status } = res;
          if (status === 'success') {
            set({
              user,
              status: 'authorized',
              error: null,
              isLoggedIn: true,
            });
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
            data: { status: 'error', message: 'Login failed' },
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

      register: async (email, password, name): Promise<void> => {
        set({ status: 'loading', error: null });
        try {
          const { status, message } = await service.register(
            email,
            password,
            name
          );
          console.log('Register response:', status, message);
          if (status === 'success') {
            set({ status: 'authenticated', error: null, beMessage: message });
          }
        } catch (error) {
          const { message } = (error as any) || {};
          console.error('Register failed:', error);
          set({
            status: 'apiError',
            error: 'Register failed',
            beMessage: message,
          });
          return;
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
            set({ status: 'authenticated', error: null, beMessage: message });
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
        set({ status: 'loading', error: null });
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
          const { user, status, message } = await service.currentUser();
          set({
            user,
            status: 'authorized',
            error: null,
            isLoggedIn: true,
            isEmailVerified: user.isEmailVerified,
            beMessage: message,
          });
          console.log('Fetched current user:', user);
          return { user, status, message };
        } catch (error) {
          console.error(
            'Fetching current user failed try to refresh tokens:',
            error
          );
          const status =
            (error as any)?.status ?? (error as any)?.response?.status;
          if (status === 401) {
            const { status, message } = await service.refreshTokens();
            if (status === 'success') {
              // try again
              const { user, message } = await service.currentUser();
              if (user) {
                set({
                  user,
                  status: 'authorized',
                  error: null,
                  isLoggedIn: true,
                  isEmailVerified: user.isEmailVerified,
                  beMessage: message,
                });
                return { user, status, message };
              }
              set({
                status: 'apiError',
                error: 'Fetching current user failed proceed to login',
                user: null,
                isLoggedIn: false,
                isEmailVerified: false,
              });
              return null;
            } else if (status === 'error') {
              set({
                status: 'forbidden',
                error: message,
                user: null,
                isLoggedIn: false,
                isEmailVerified: false,
              });
              return null;
            }
          }
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
          set({ status: 'apiError', error: e?.message ?? 'Refresh failed' });
          // fallback: force logout if refresh fails
          await get().logout();
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
        isEmailVerified: s.isEmailVerified,
      }),
    }
  )
);
