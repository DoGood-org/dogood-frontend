'use client';

import { Moon, Sun } from '@/components/icons';
import { useTheme } from '@/context/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (): void => {
    toggleTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-[65px] h-[30px] rounded-full flex items-center justify-between
        px-2 transition-colors duration-800 cursor-pointer
        ${theme === 'dark' ? 'bg-toggle' : 'bg-btn-hover'}`}
      aria-label="Перемикач теми"
    >
      <Moon width={16} height={16} className="pointer-events-none" />
      <Sun width={16} height={16} className="pointer-events-none" />
      <span
        className={`absolute top-0 left-0 w-[30px] h-[30px] bg-white rounded-full shadow-md
          transform transition-transform duration-800
          ${theme === 'dark' ? 'translate-x-0' : 'translate-x-[35px]'}`}
      />
    </button>
  );
};
