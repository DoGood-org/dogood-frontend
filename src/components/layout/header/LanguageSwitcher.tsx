'use client';

import { usePathname } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { locales } from '@/lib/i18n';

const localeToFlag: Record<string, string> = {
  en: 'English',
  uk: 'Ukrainian',
};

export const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname();
  // const router = useRouter();
  const [_, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const currentLocale = pathname.split('/')[1];

  useEffect(() => {
    // Зберігаємо поточну мову в localStorage при завантаженні
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', currentLocale);
    }
  }, [currentLocale]);

  const handleChange = (locale: string): void => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', locale);
      document.cookie = `preferred-locale=${locale}; path=/; max-age=31536000`;
      window.location.href = newPath;
    }
    setOpen(false);
    startTransition(() => {
      // router.push(newPath);
      window.location.href = newPath;
    });
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        {localeToFlag[currentLocale]}
        <span>▼</span>
      </button>
      {open && (
        <div>
          {locales
            .filter((loc) => loc !== currentLocale)
            .map((locale) => (
              <button key={locale} onClick={() => handleChange(locale)}>
                {localeToFlag[locale]}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
