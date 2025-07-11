'use client';

import React from 'react';
import { Link, usePathname } from '../../i18n/navigation';

import SidebarUserIcon from '@/components/icons/SidebarUserIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import MapIcon from '@/components/icons/MapIcon';
import GoalsIcon from '@/components/icons/GoalsIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';

const navigationLinks = [
  { href: '/', label: 'Account', Icon: SidebarUserIcon },
  { href: '/chat', label: 'Chat', Icon: ChatIcon },
  { href: '/map', label: 'Map', Icon: MapIcon },
  { href: '/goals', label: 'Goals', Icon: GoalsIcon },
  { href: '/settings', label: 'Settings', Icon: SettingsIcon },
];

interface NavigationLinksProps {
  showLabels?: boolean;
  linkClassName?: string;
  iconClassName?: string;
  className?: string;
  navLabels?: string;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
  showLabels = true,
  linkClassName = '',
  iconClassName = '',
  className = '',
  navLabels = '',
}) => {
  const pathname = usePathname();

  const locale = pathname.split('/')[1] || 'en';

  return (
    <ul className={className}>
      {navigationLinks.map(({ href, label, Icon }, index) => {
        const expectedPath = href === '/' ? `/${locale}` : `/${locale}${href}`;
        const isActive = pathname === expectedPath;

        return (
          <li key={index}>
            <Link
              href={expectedPath}
              className={`
                flex items-center gap-3 lg:p-3 rounded-xl border-0 transition duration-300 text-[#1B1B1B] lg:border  
                ${isActive ? 'lg:border-[#1B9757]' : 'lg:border-transparent hover:lg:border-[#1B9757] transition duration-300'}
                ${linkClassName}
              `}
            >
              <Icon
                className={`
                  w-6 h-6 transition-colors duration-300
                  ${isActive ? 'text-[#1B9757] sm:text-[#1B9757] md:text-[#1B9757]' : 'text-[#f1f1f1] transition duration-300'}
                  lg:text-[#1B1B1B]
                  group-hover:text-[#1B9757]
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
