'use client';

import React from 'react';
import { Link, usePathname } from '../../i18n/navigation';
// import { useTranslations } from 'next-intl';

import SidebarUserIcon from '@/components/icons/SidebarUserIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import MapIcon from '@/components/icons/MapIcon';
import GoalsIcon from '@/components/icons/GoalsIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';
import { NavigationLinksProps } from '@/types/navigationType';

const navigationLinks = [
  { href: '/', label: 'Account', Icon: SidebarUserIcon },
  { href: '/chat', label: 'Chat', Icon: ChatIcon },
  { href: '/map', label: 'Map', Icon: MapIcon },
  { href: '/goals', label: 'Goals', Icon: GoalsIcon },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon },
];

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
  showLabels = true,
  linkClassName = '',
  iconClassName = '',
  className = '',
  navLabels = '',
}) => {
  const pathname = usePathname();

  const locale = pathname.split('/')[1] || 'en';

  // const t = useTranslations('navigation');

  return (
    <ul className={className}>
      {navigationLinks.map(({ href, label, Icon }) => {
        const expectedPath = href === '/' ? `/${locale}` : `/${locale}${href}`;
        const isActive =
          pathname === expectedPath || pathname.startsWith(expectedPath + '/');

        return (
          <li key={href}>
            <Link
              href={expectedPath}
              className={`
              flex items-center gap-3 lg:p-3 rounded-xl border-0 transition duration-300 text-bg-icon
              lg:border  ${isActive ? 'lg:border-border' : 'lg:border-transparent hover:lg:border-border'}
              ${linkClassName}
           `}
            >
              <Icon
                className={`
                w-6 h-6 transition-colors duration-300
                ${isActive ? 'text-btn-outline-active' : 'text-white'}
                lg:text-bg-icon
                group-hover:lg:text-btn-outline-active
                ${iconClassName}
              `}
              />
              {showLabels && <span className={navLabels}>{label}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
