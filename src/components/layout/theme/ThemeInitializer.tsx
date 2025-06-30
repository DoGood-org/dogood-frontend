'use client';

import { useEffect } from 'react';
import { getInitialTheme, applyTheme } from '@/zustand/services/themeService';
import type { Theme } from '@/types';
import { useTheme } from '@/hooks';

export const ThemeInitializer = (): null => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const initialTheme: Theme = getInitialTheme();
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, [setTheme]);

  return null;
};
