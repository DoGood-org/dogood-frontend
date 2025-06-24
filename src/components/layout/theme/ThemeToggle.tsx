'use client';

import { Moon, Sun } from '@/components/icons';
import { useTheme } from '@/hooks/useTheme';
import { toggleTheme } from '@/zustand/services/themeService';
import { useTranslations } from 'next-intl';

export const ThemeToggle: React.FC = () => {
  const { theme } = useTheme();
  const t = useTranslations('header');

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-[65px] h-[30px] rounded-full flex items-center justify-between
        px-2 transition-colors duration-700 cursor-pointer
        ${theme === 'dark' ? 'bg-toggle' : 'bg-btn-hover'}
        `}
      aria-label={`${t('toggle')}`}
    >
      <Moon width={16} height={16} className="pointer-events-none" />
      <Sun width={16} height={16} className="pointer-events-none" />
      <span
        className={`absolute top-0 left-0 w-[30px] h-[30px] bg-white rounded-full shadow-md
          transform transition-transform duration-700
          ${theme === 'dark' ? 'translate-x-0' : 'translate-x-[35px]'}
          `}
      />
    </button>
  );
};
