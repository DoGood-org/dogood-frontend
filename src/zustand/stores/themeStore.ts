import { create } from 'zustand';
import type { Theme, ThemeStore } from '@/types';

export const useThemeStore = create<ThemeStore>(
  (set): ThemeStore => ({
    theme: undefined,
    setTheme: (theme: Theme): void => {
      set({ theme });
    },
  })
);
