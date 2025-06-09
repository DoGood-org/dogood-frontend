import { useThemeStore } from '@/zustand/stores/themeStore';
import { ThemeStore } from '@/types';

export const useTheme = (): ThemeStore => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return { theme, setTheme };
};
