'use client';

import React from 'react';
import { NavigationPageProps } from '@/types/navigationType';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import SidebarUserIcon from '@/components/icons/SidebarUserIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import MapIcon from '@/components/icons/MapIcon';
import GoalsIcon from '@/components/icons/GoalsIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';

const navigationPages = [
  {
    label: 'Account',
    translationKey: 'account',
    Icon: SidebarUserIcon,
    path: '/account',
  },
  {
    label: 'Chat',
    translationKey: 'chat',
    Icon: ChatIcon,
    path: '/account/chat',
  },
  {
    label: 'Map',
    translationKey: 'map',
    Icon: MapIcon,
    path: '/account/map',
  },
  {
    label: 'Goals',
    translationKey: 'goals',
    Icon: GoalsIcon,
    path: '/goals',
  },
  {
    label: 'Settings',
    translationKey: 'settings',
    Icon: SettingsIcon,
    path: '/settings',
  },
];
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
              passHref
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
                  group-hover:lg:text-btn-outline-active
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
