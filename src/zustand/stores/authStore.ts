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
import type { User } from '@/types';
import { AuthService } from '@/zustand/services/authService';
const userExample = {
  id: '',
  email: 'user@mail.com',
  name: 'User Name',
  avatarUrl: '',
};
type Status = 'idle' | 'loading' | 'authenticated' | 'error' | 'refreshing';

type AuthState = {
  user: User | null;
  isLoggedIn: boolean; // optional, can be derived from user
  verified: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  status: Status;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  verify: (token: string) => Promise<void>;
  registerCompany: (
    name: string,
    email: string,
    password: string,
    organizationName: string
  ) => Promise<void>;
  currentUser: () => Promise<void>;
  refresh: () => Promise<void>;
};
type Step =
  | null
  | 'success'
  | 'forgotPassword'
  | 'forgotEmail'
  | 'verification'
  | 'resend'
  | 'mistake';
export const useAuthFlow = create<{ step: Step; setStep: (s: Step) => void }>(
  (set) => ({
    step: null,
    setStep: (s) => set({ step: s }),
  })
);

const service = new AuthService();

export const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: userExample || null,
      isLoggedIn: true,
      verified: false,
      accessToken: null,
      refreshToken: null,
      status: 'idle',
      error: null,

      login: async (email, password) => {
        set({ status: 'loading', error: null });
        try {
          const { accessToken, refreshToken, user } = await service.login(
            email,
            password
          );
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          }
          set({ user, accessToken, refreshToken, status: 'authenticated' });
        } catch (error) {
          console.error('Login failed:', error);
          set({ status: 'error', error: 'Login failed' });
          return;
        }
      },

      logout: async () => {
        try {
          await service.logout();
        } catch (e) {
          console.error('Logout failed:', e);
        } finally {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            status: 'idle',
            error: null,
          });
        }
      },

      register: async (email, password, name) => {
        set({ status: 'loading', error: null });
        const { accessToken, refreshToken, user } = await service.register(
          email,
          password,
          name
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
      },

      registerCompany: async (name, email, password, organizationName) => {
        set({ status: 'loading', error: null });
        const { accessToken, refreshToken, user } =
          await service.registerCompany(
            name,
            email,
            password,
            organizationName
          );
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
      },
      verify: async (token) => {
        set({ status: 'loading', error: null });
        try {
          await service.verify(token);
          set({ verified: true, status: 'authenticated', error: null });
        } catch (error) {
          console.error('Verification failed:', error);
          set({ status: 'error', error: 'Verification failed' });
          return;
        }
      },

      currentUser: async () => {
        set({ status: 'loading', error: null });
        const user = await service.currentUser();
        set({ user, status: 'authenticated', error: null });
      },

      // NOTE: your AuthService.refreshTokens() currently returns void.
      // Prefer returning new tokens so we can store them. Until then we just call it and re-fetch user.
      refresh: async () => {
        try {
          await service.refreshTokens();
          // if your API also returns tokens here, set them like in login()
          // const { accessToken, refreshToken } = await service.refreshTokens();
          // localStorage.setItem('accessToken', accessToken);
          // localStorage.setItem('refreshToken', refreshToken);
          await get().currentUser();
        } catch (e: any) {
          set({ status: 'error', error: e?.message ?? 'Refresh failed' });
          // fallback: force logout if refresh fails
          await get().logout();
        }
      },
    }),
    {
      name: 'auth', // storage key
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      // don't double-persist status/error
      partialize: (s) => ({
        user: s.user,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      }),
    }
  )
);
