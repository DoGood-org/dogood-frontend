'use client';

import React from 'react';
import { NavigationPageProps, Page } from '@/types/navigationType';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { useTranslations } from 'next-intl';

import SidebarUserIcon from '@/components/icons/SidebarUserIcon';
import ChatIcon from '@/components/icons/ChatIcon';
import MapIcon from '@/components/icons/MapIcon';
import GoalsIcon from '@/components/icons/GoalsIcon';
import SettingsIcon from '@/components/icons/SettingsIcon';

const navigationPages: {
  label: Page;
  translationKey: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  { label: 'Account', translationKey: 'account', Icon: SidebarUserIcon },
  { label: 'Chat', translationKey: 'chat', Icon: ChatIcon },
  { label: 'Map', translationKey: 'map', Icon: MapIcon },
  { label: 'Goals', translationKey: 'goals', Icon: GoalsIcon },
  { label: 'Settings', translationKey: 'settings', Icon: SettingsIcon },
];

export const PageNavigation: React.FC<NavigationPageProps> = ({
  showLabels = true,
  linkClassName = '',
  iconClassName = '',
  className = '',
  navLabels = '',
}) => {
  const t = useTranslations('navigation');
  const { currentPage, setCurrentPage } = navigationStore();

  return (
    <ul className={className}>
      {navigationPages.map(({ label, translationKey, Icon }) => {
        const isActive = currentPage === label;

        return (
          <li key={label}>
            <button
              onClick={() => setCurrentPage(label)}
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
            </button>
          </li>
        );
      })}
    </ul>
  );
};
