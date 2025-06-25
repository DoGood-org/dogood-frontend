import { AuthState } from '@/types/authType';
import { create } from 'zustand';

const userExample = {
  id: '',
  email: 'user@mail.com',
  name: 'User Name',
  avatarUrl: '',
};

export const authStore = create<AuthState>((set) => ({
  isLoggedIn: true,
  // user: null,
  user: userExample,
  login: (userData): void => set({ user: userData, isLoggedIn: true }),
  logout: (): void => set({ user: null, isLoggedIn: false }),
}));
