export type Theme = 'light' | 'dark';

export type ThemeStore = {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
};
