import { AuthState } from '@/types/authType';
import { create } from 'zustand';

export const authStore = create<AuthState>((set) => ({
  isLoggedIn: true,
  // user: null,
  user: { id: '', email: 'user@mail.com', name: 'User Name', avatarUrl: '' },
  login: (userData): void => set({ user: userData, isLoggedIn: true }),
  logout: (): void => set({ user: null, isLoggedIn: false }),
}));
