'use client';

import React from 'react';
import { NavigationPageProps } from '@/types/navigationType';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { navigationPages } from '@/constants/navigationPages';

export const PageNavigation: React.FC<NavigationPageProps> = ({
  showLabels = true,
  linkClassName = '',
  iconClassName = '',
  className = '',
  navLabels = '',
}) => {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  return (
    <ul className={className}>
      {navigationPages.map(({ label, translationKey, Icon, path }) => {
        const isActive = pathname === path;

        return (
          <li key={label}>
            <Link
              href={path}
              className={`
              flex items-center gap-3 lg:p-3 rounded-xl border-[1px] border-transparent transition duration-300 text-bg-icon
              lg:border cursor-pointer ${isActive ? 'lg:border-border' : 'lg:border-transparent hover:lg:border-border'}
              ${linkClassName}
              w-full
              justify-start
            `}
            >
              <Icon
                className={`
                  w-6 h-6 transition-colors duration-300
                  ${isActive ? 'text-btn-outline' : 'text-foreground'}
                  lg:text-bg-icon
                  md:hover:text-btn-outline-active
                  ${iconClassName}
                `}
              />
              {showLabels && (
                <span className={navLabels}>{t(translationKey)}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
