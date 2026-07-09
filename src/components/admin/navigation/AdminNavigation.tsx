'use client';

import React from 'react';
import { PageNavigation } from '@/components/account/navigation/PageNavigation';
import { useTranslations } from 'next-intl';
import { adminPages } from '@/constants/adminPages';

export const AdminNavigation: React.FC = () => {
  const t = useTranslations('adminNav');

  return (
    <div className="lg:block lg:min-w-[136px]">
      <nav className="flex-col hidden gap-6 lg:flex">
        <PageNavigation
          items={adminPages}
          t={t}
          showLabels={true}
          className="flex flex-col gap-2 "
          navLabels="text-base text-foreground"
          linkClassName="flex gap-2 lg:py-3 lg:px-6"
          iconClassName="w-6 h-6"
        />
      </nav>
    </div>
  );
};
