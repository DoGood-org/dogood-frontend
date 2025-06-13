import { useThemeStore } from '@/zustand/stores/themeStore';
import { ThemeStore } from '@/types';

export const useTheme = (): ThemeStore => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return { theme, setTheme };
};
