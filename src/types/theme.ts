export type Theme = 'light' | 'dark';

export type ThemeStore = {
  theme: Theme | undefined;
  // toggleTheme?: (forcedTheme?: Theme) => void;
  setTheme: (theme: Theme) => void;
};
