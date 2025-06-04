'use client';

import { usePathname } from 'next/navigation';
import { useTransition, useState, useEffect, useRef } from 'react';
import { routing } from '@/i18n/routing';
import { ChevronDown } from '@/components/icons';

const localeLabels: Record<string, string> = {
  en: 'English',
  // ua: 'Українська',
};

export const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { locales, defaultLocale } = routing;
  const currentLocale =
    locales.find((locale) => pathname.startsWith(`/${locale}`)) ||
    defaultLocale;
  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', currentLocale);
    }
  }, [currentLocale]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (locale: string): void => {
    const newPath = `/${locale}${pathWithoutLocale}`;

    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', locale);
      document.cookie = `preferred-locale=${locale}; path=/; max-age=31536000`;
      window.location.href = newPath;
    }

    setOpen(false);
    startTransition(() => {
      window.location.href = newPath;
    });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-[147px] flex items-center justify-between gap-2 rounded-md bg-toggle px-4 py-2 text-white hover:bg-neutral-700 transition duration-700 cursor-pointer"
      >
        {localeLabels[currentLocale] ?? currentLocale}
        <ChevronDown
          className={`w-[14px] h-[8px] fill-current transition-transform duration-700 
            ${open ? 'rotate-180' : ''}
            `}
        />
      </button>

      <div
        className={`absolute right-0 w-full overflow-hidden rounded-md bg-neutral-800 shadow-lg z-10 transition-all duration-700',
          ${
            open
              ? 'max-h-40 opacity-100 scale-100'
              : 'max-h-0 opacity-0 scale-95 mt-0 pointer-events-none'
          }
        `}
      >
        <div className="flex flex-col">
          {locales
            .filter((loc) => loc !== currentLocale)
            .map((locale) => (
              <button
                key={locale}
                onClick={() => handleChange(locale)}
                className="px-4 py-2 text-left text-white hover:bg-neutral-700 transition duration-700 cursor-pointer"
              >
                {localeLabels[locale] ?? locale}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
