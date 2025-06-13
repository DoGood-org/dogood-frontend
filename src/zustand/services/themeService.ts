import { useThemeStore } from '@/zustand/stores/themeStore';
import type { Theme } from '@/types';

export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem('theme') as Theme | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return stored ?? (prefersDark ? 'dark' : 'light');
};

export const applyTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
};

export const toggleTheme = (): void => {
  const { theme, setTheme } = useThemeStore.getState();

  if (!setTheme) return; // safety

  const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  setTheme(newTheme);
};
