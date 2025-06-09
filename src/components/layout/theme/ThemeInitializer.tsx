'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/zustand/stores/themeStore';
import { getInitialTheme, applyTheme } from '@/zustand/services/themeService';
import type { Theme } from '@/types';

export const ThemeInitializer = (): null => {
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    const initialTheme: Theme = getInitialTheme();
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, [setTheme]);

  return null;
};
