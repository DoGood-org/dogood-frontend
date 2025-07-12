'use client';

import React from 'react';
import { NavigationLinksProps, Page } from '@/types/navigationType';
import { navigationStore } from '@/zustand/stores/navigationStore';
// import { useTranslations } from 'next-intl';

import SidebarUserIcon from '@/components/icons/SidebarUserIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import MapIcon from '@/components/icons/MapIcon';
import GoalsIcon from '@/components/icons/GoalsIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';

const navigationLinks: {
  label: Page;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  { label: 'Account', Icon: SidebarUserIcon },
  { label: 'Chat', Icon: ChatIcon },
  { label: 'Map', Icon: MapIcon },
  { label: 'Goals', Icon: GoalsIcon },
  { label: 'Settings', Icon: SettingsIcon },
];

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
  showLabels = true,
  linkClassName = '',
  iconClassName = '',
  className = '',
  navLabels = '',
}) => {
  // const t = useTranslations('navigation');
  const { currentPage, setCurrentPage } = navigationStore();

  return (
    <ul className={className}>
      {navigationLinks.map(({ label, Icon }) => {
        const isActive = currentPage === label;

        return (
          <li key={label}>
            <button
              onClick={() => setCurrentPage(label)}
              className={`
              flex items-center gap-3 lg:p-3 rounded-xl border-[1px] transition duration-300 text-bg-icon
              lg:border ${isActive ? 'lg:border-border' : 'lg:border-transparent hover:lg:border-border'}
              ${linkClassName}
              w-full
              justify-start
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
            </button>
          </li>
        );
      })}
    </ul>
  );
};
