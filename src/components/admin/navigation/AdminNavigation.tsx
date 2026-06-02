'use client';

import React from 'react';
import { PageNavigation } from '@/components/account/navigation/PageNavigation';
import { useTranslations } from 'next-intl';
import { adminPages } from '@/constants/adminPages';
// import { navigationPages } from '@/constants/navigationPages';

export const AdminNavigation: React.FC = () => {
  const t = useTranslations('adminNav');

  return (
    <div className="lg:block lg:min-w-[136px]">
      <nav className="hidden lg:flex flex-col gap-6">
        <PageNavigation
          items={adminPages}
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
