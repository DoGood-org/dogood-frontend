'use client';

import { BottomNavigation } from '@/components/account/navigation/BottomNavigation';
import { AdminButtons } from '@/components/admin/navigation/AdminButtons';
import { AdminNavigation } from '@/components/admin/navigation/AdminNavigation';
import { Container } from '@/components/ui/Container';
import { adminPages } from '@/constants/adminPages';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const t = useTranslations('adminNav');

  return (
    <Container className="flex flex-col pt-[34px] md:pt-[64px] lg:py-[80px] ">
      <div className="justify-between gap-6 lg:flex">
        <aside className="lg:flex min-w-[200px] lg:p-6 lg:bg-admin-background rounded-lg lg:min-h-[727px]  flex-col justify-between">
          <AdminNavigation />
          <AdminButtons />
        </aside>
        {children}
      </div>
      <BottomNavigation items={adminPages} translation={t} />
    </Container>
  );
}
