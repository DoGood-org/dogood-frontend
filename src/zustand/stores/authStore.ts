import { create } from 'zustand';

type AuthState = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const authStore = create<AuthState>((set) => ({
  isLoggedIn: true,
  login: (): void => set({ isLoggedIn: true }),
  logout: (): void => set({ isLoggedIn: false }),
}));
