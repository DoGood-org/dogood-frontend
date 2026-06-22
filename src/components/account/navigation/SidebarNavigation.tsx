'use client';

import React from 'react';
import { PageNavigation } from '@/components/account/navigation/PageNavigation';
import { useTranslations } from 'next-intl';
import { navigationPages } from '@/constants/navigationPages';

export const SidebarNavigation: React.FC = () => {
  const t = useTranslations('navigation');

  return (
    <div className="lg:block lg:min-w-[136px] bg-background pt-20">
      <nav className="hidden lg:flex flex-col gap-6">
        <PageNavigation
          items={navigationPages}
          t={t}
          showLabels={true}
          className="flex flex-col gap-6 "
          navLabels="text-base text-foreground"
          linkClassName="flex gap-5 p-3"
          iconClassName="w-6 h-6"
        />
      </nav>
    </div>
  );
};
