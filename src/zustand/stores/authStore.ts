// 'use client';
// // export const authStore = create<AuthState>((set) => ({
// //   isLoggedIn: true,
// //   // user: null,
// //   user: userExample,
// //   login: (userData): void => set({ user: userData, isLoggedIn: true }),
// //   logout: (): void => set({ user: null, isLoggedIn: false }),
// // }));

// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import type { ICurrentUser } from '@/types';
// import {
//   AuthService,
//   IAuthResponse,
//   ICurrentUserResponse,
// } from '@/zustand/services/authService';
// import { toast } from 'react-toastify';

// type Status =
//   | 'idle'
//   | 'loading'
//   | 'authenticated'
//   | 'verifying'
//   | 'apiError'
//   | 'refreshing'
//   | 'authorized'
//   | 'forbidden'; // 403 from API;

// type TAuthState = {
//   user: ICurrentUser | null;
//   isLoggedIn: boolean;
//   isEmailVerified: boolean;

//   status: Status;
//   beMessage: string;
//   error: string | null;
//   login: (email: string, password: string) => Promise<IAuthResponse>;
//   logout: () => Promise<void>;
//   register: (
//     email: string,
//     password: string,
//     name: string
//   ) => Promise<IAuthResponse>;
//   verify: (token: string) => Promise<IAuthResponse>;
//   registerCompany: (
//     name: string,
//     email: string,
//     password: string,
//     organizationName: string
//   ) => Promise<void>;
//   currentUser: (options?: {
//     silent?: boolean;
//   }) => Promise<ICurrentUserResponse | null>;
//   refresh: () => Promise<void>;
//   resendVerificationEmail: (email: string) => Promise<void>;
//   requestToResetPassword: (email: string) => Promise<IAuthResponse>;
//   resetPassword: (
//     resetToken: string,
//     newPassword: string
//   ) => Promise<IAuthResponse>;

//   nextResendAt: number | null;
//   setNextResendAt: (ts: number | null) => void;
// };
// type Step =
//   | null
//   | 'proceedToUserSpace'
//   | 'proceedToLogin'
//   | 'resetPassword'
//   | 'forgotPasswordEnterEmail'
//   | 'verification'
//   | 'resendLink'
//   | 'mistakeInEmail'
//   | 'mistakeApi';
// export const useAuthFlow = create<{ step: Step; setStep: (s: Step) => void }>(
//   (set) => ({
//     step: null,
//     setStep: (s): void => set({ step: s }),
//   })
// );

// const service = new AuthService();

// export const authStore = create<TAuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       isLoggedIn: false,
//       isEmailVerified: false,
//       status: 'idle',
//       error: null,
//       beMessage: '',
//       nextResendAt: null,
//       setNextResendAt: (ts): any => set({ nextResendAt: ts }),

//       login: async (email, password): Promise<IAuthResponse> => {
//         try {
//           const res = await service.login(email, password);

//           if (res.ok) {
//             toast.success('Login successful');
//             set({
//               status: 'authorized',
//               error: null,
//               isLoggedIn: true,
//             });
//             return res;
//           }
//           return res;
//         } catch (error) {
//           console.error('Login failed:', error);
//           set({
//             status: 'apiError',
//             error: 'Login failed',
//             user: null,
//             isLoggedIn: false,
//           });
//           return {
//             ok: false,
//             status: 500,
//             errorMessage: 'Login failed',
//           };
//         }
//       },

//       logout: async (): Promise<void> => {
//         try {
//           await service.logout();
//         } catch (e) {
//           console.error('Logout failed:', e);
//         }
//         set({
//           user: null,
//           isLoggedIn: false,
//           status: 'idle',
//           error: null,
//         });
//       },

//       register: async (email, password, name): Promise<IAuthResponse> => {
//         try {
//           const res = await service.register(email, password, name);
//           if (!res.ok) {
//             toast.error(
//               'Sign up failed: ' + (res.errorMessage || 'Something went wrong')
//             );
//           }
//           if (res.ok) {
//             toast.success('Registration successful');
//             set({ status: 'verifying', error: null, beMessage: res.message });
//             return res;
//           }
//           return res;
//         } catch (error) {
//           const { message } = (error as any) || {};
//           toast.error('Registration failed');
//           set({
//             status: 'apiError',
//             error: 'Register failed',
//             beMessage: message,
//           });
//           return {
//             ok: false,
//             status: 500,
//             errorMessage: 'Register failed',
//           };
//         }
//       },

//       registerCompany: async (
//         name,
//         email,
//         password,
//         organizationName
//       ): Promise<void> => {
//         try {
//           const res = await service.registerCompany(
//             name,
//             email,
//             password,
//             organizationName
//           );
//           if (!res.ok) {
//             toast.error(
//               'Login failed: ' + (res.errorMessage || 'Something went wrong')
//             );
//           }
//           if (res.ok) {
//             toast.success('Organization registration successful');
//             set({ status: 'verifying', error: null });
//             return;
//           }
//         } catch (error) {
//           const { message } = (error as any) || {};
//           toast.error('Organization registration failed');
//           set({
//             status: 'apiError',
//             error: 'Register company failed',
//             beMessage: message,
//           });
//           return;
//         }
//       },
//       verify: async (token): Promise<IAuthResponse> => {
//         try {
//           const res = await service.verify(token);
//           if (res.ok) {
//             toast.success('Email verification successful');
//             set({
//               isEmailVerified: true,
//               status: 'authenticated',
//               error: null,
//             });
//           }
//         } catch (error) {
//           const { message } = (error as any) || {};
//           toast.error('Verification failed');
//           set({
//             status: 'apiError',
//             error: 'Verification failed',
//             isEmailVerified: false,
//             beMessage: message,
//           });
//           return {
//             ok: false,
//             status: 500,
//             errorMessage: 'Verification failed',
//           };
//         }
//         return { ok: true, errorMessage: 'Verification succeeded' };
//       },
//       currentUser: async (
//         _options = {}
//       ): Promise<ICurrentUserResponse | null> => {
//         // 1. Якщо ми вже вантажимо юзера — просто повертаємо поточний проміс або null
//         if (get().status === 'loading') {
//           return null;
//         }

//         set({ status: 'loading', error: null });

//         try {
//           const res = await service.currentUser();

//           if (res && res.ok) {
//             // ... успішне оновлення стейту
//             set({
//               status: 'authorized',
//               isLoggedIn: true,
//               user: res.user as ICurrentUser,
//             });
//             return res;
//           }

//           return null;
//         } catch (_error: any) {
//           // 2. ВАЖЛИВО: якщо сталася помилка 401, не скидайте isLoggedIn тут!
//           // Дайте можливість Axios інтерцептору зробити рефреш.
//           set({ status: 'idle' });
//           return null;
//         }
//       },
//       refresh: async (): Promise<void> => {
//         try {
//           // Просто викликаємо, нічого не зберігаємо
//           await get().currentUser({ silent: true });
//         } catch (e) {
//           console.error(e);
//         }
//       },
//       resendVerificationEmail: async (email: string): Promise<void> => {
//         const COOLDOWN_MS = 60_000;

//         const next = get().nextResendAt;
//         if (next && Date.now() < next) return;

//         try {
//           const res = await service.resendVerificationEmail(email);

//           if (res.ok) {
//             toast.success('Verification email resent successfully');

//             set({ nextResendAt: Date.now() + COOLDOWN_MS });
//             return;
//           }

//           toast.error(res.errorMessage || 'Resend verification email failed');
//         } catch (e) {
//           console.error('Resend verification email failed:', e);
//           toast.error('Resend verification email failed');
//         }
//       },
//       requestToResetPassword: async (email: string): Promise<IAuthResponse> => {
//         try {
//           const res = await service.forgotPassword(email);
//           if (res.ok) {
//             return res;
//           }
//           return res;
//         } catch (e) {
//           console.error('Request to reset password failed:', e);
//           throw e;
//         }
//       },
//       resetPassword: async (
//         resetToken: string,
//         newPassword: string
//       ): Promise<IAuthResponse> => {
//         try {
//           const res = await service.resetPassword(resetToken, newPassword);
//           if (res.ok) {
//             toast.success('Password reset successful');
//             return res;
//           }
//           return res;
//         } catch (e) {
//           toast.error('Reset password failed');
//           console.error('Reset password failed:', e);
//           return {
//             ok: false,
//             status: 500,
//             errorMessage: 'Reset password failed',
//           };
//         }
//       },
//     }),
//     {
//       name: 'auth',
//       storage: createJSONStorage(() =>
//         typeof window !== 'undefined'
//           ? localStorage
//           : {
//               getItem: (): string | null => null,
//               setItem: (): void => {},
//               removeItem: (): void => {},
//             }
//       ),
//       partialize: (s) => ({
//         user: s.user,
//         isLoggedIn: s.isLoggedIn,
//         nextResendAt: s.nextResendAt,
//       }),
//     }
//   )
// );
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

  registerCompany: (
    name: string,
    email: string,
    password: string,
    organizationName: string
  ) => Promise<IAuthResponse | void>;

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
      setNextResendAt: (ts: number | null): void => {
        set({ nextResendAt: ts });
      },

      // =====================
      // LOGIN (DTO FIXED)
      // =====================
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

      // =====================
      // LOGOUT
      // =====================
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

      // =====================
      // REGISTER (FIXED)
      // =====================
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

      // =====================
      // VERIFY
      // =====================
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

      // =====================
      // REGISTER COMPANY (FIXED DTO)
      // =====================
      registerCompany: async (
        name,
        email,
        password,
        organizationName
      ): Promise<IAuthResponse | void> => {
        try {
          const res = await service.registerCompany({
            name,
            email,
            password,
            organizationName,
          });

          if (res.ok) {
            toast.success('Organization registration successful');

            set({
              status: 'verifying',
              error: null,
            });
          } else {
            toast.error(res.errorMessage || 'Organization registration failed');
          }

          return res;
        } catch {
          set({
            status: 'apiError',
            error: 'Register company failed',
          });
        }
      },

      // =====================
      // CURRENT USER
      // =====================
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

      // =====================
      // REFRESH
      // =====================
      refresh: async (): Promise<void> => {
        await get().currentUser();
      },

      // =====================
      // RESEND EMAIL
      // =====================
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

      // =====================
      // FORGOT PASSWORD
      // =====================
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

      // =====================
      // RESET PASSWORD (DTO FIXED)
      // =====================
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
