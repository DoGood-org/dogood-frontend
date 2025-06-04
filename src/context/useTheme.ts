import { ThemeContextType } from '@/types';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
