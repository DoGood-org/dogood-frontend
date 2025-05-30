'use client';

import { Moon, Sun } from '@/components/icons';
import { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  type Theme = 'dark' | 'light';

  const toggleTheme: () => void = () => {
    setTheme((prev: Theme): Theme => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-[65px] h-[30px] rounded-full flex items-center justify-between
        px-2 transition-colors duration-300 cursor-pointer
        ${theme === 'dark' ? 'bg-toggle' : 'bg-btn-hover'}
      `}
      aria-label="Перемикач теми"
    >
      {/* Іконка Місяця зліва */}
      <Moon width={16} height={16} className=" pointer-events-none" />

      {/* Іконка Сонця справа */}
      <Sun width={16} height={16} className="pointer-events-none" />

      {/* Повзунок */}
      <span
        className={`
          absolute top-0 left-0 w-[30px] h-[30px] bg-white rounded-full shadow-md
          transform transition-transform duration-300
          ${theme === 'dark' ? 'translate-x-0' : 'translate-x-[35px]'}
        `}
      />
    </button>
  );
};
