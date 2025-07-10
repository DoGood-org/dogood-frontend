'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const locale = pathname.split('/')[1];

  const filteredLinks = navigationLinks;

  return (
    <ul className={className}>
      {filteredLinks.map(({ href, label, Icon }, index) => {
        const expectedPath = href.startsWith('/')
          ? `/${locale}${href}`
          : `/${locale}/${href}`;
        const isActive = pathname === expectedPath;

        return (
          <li key={index}>
            <Link
              href={expectedPath}
              className={`
                flex items-center gap-3 p-3 w-full rounded-md border-2
                ${isActive ? 'border-green-600 text-[#1B9757]' : 'border-transparent hover:border-green-600 transition duration-300'}
                ${linkClassName}
           `}
            >
              <Icon
                className={`
                  w-6 h-6 transition-colors duration-300
                  ${isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'}
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
