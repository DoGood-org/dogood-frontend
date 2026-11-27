'use client';

import React, { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { UserReview, Organizations, AboutUs } from '@/components/icons';
import { ButtonsPanelProps } from '@/types/admin';

export const ButtonsPanel = ({
  activeTab,
  onTabChange,
}: ButtonsPanelProps): JSX.Element => {
  const t = useTranslations('adminReviews');
  const tabs = [
    {
      key: 'USER',
      label: t('users'),
      icon: <UserReview className="w-5 h-5" />,
    },
    {
      key: 'ORGANIZATION',
      label: t('organizations'),
      icon: <Organizations className="w-5 h-5" />,
    },
    {
      key: 'PLATFORM',
      label: t('aboutUs'),
      icon: <AboutUs className="w-5 h-5" />,
    },
  ];
  const handleTabClick = (key: string): void => {
    onTabChange(activeTab === key ? '' : key);
  };
  return (
    <ul className="flex justify-between gap-3 md:gap-10 w-full">
      {tabs.map(({ key, label, icon }) => (
        <li key={key}>
          <button
            onClick={() => handleTabClick(key)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-sm h-12 w-22.5 md:w-45 lg:w-75.5 cursor-pointer ${
              activeTab === key ? 'border' : 'bg-card'
            }`}
          >
            {icon}
            <span className="hidden md:inline">{label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
