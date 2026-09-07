'use client';

import { BottomNavigation } from '@/components/account/navigation/BottomNavigation';
import { AdminNavigation } from '@/components/admin/navigation/AdminNavigation';
import { Container } from '@/components/ui/Container';
import { adminPages } from '@/constants/adminPages';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export const AdminLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const t = useTranslations('adminNav');

  return (
    <Container className="flex flex-col pt-[34px] md:pt-[64px] lg:py-[80px] lg:px-6 ">
      <div className="justify-between gap-6 lg:flex">
        <aside className="lg:flex lg:w-[302px] shrink-0 lg:p-6 lg:bg-admin-background rounded-lg lg:min-h-[727px]  flex-col justify-between shadow-none lg:shadow-admin dark:shadow-none">
          <AdminNavigation />
        </aside>
        {children}
      </div>
      <BottomNavigation
        items={adminPages}
        translation={t}
        navClassName="bg-text-help bg-admin-more w-[393px] md:w-full justify-between mb-12 md:mb-6 md:px-[60px] -mr-5 -ml-5 md:mx-0"
        menuWrapperClassName="bg-text-help bg-admin-more max-w-full w-full"
      />
    </Container>
  );
};
