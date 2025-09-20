'use client';

import React from 'react';
import {
  AccountContent,
  BottomNavigation,
  Container,
  SidebarNavigation,
} from '@/components';
import { useSyncCurrentPage } from '@/hooks/useSyncCurrentPage';
import { navigationStore } from '@/zustand/stores/navigationStore';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  useSyncCurrentPage();

  const isChatMessageOpen = navigationStore((state) => state.isChatMessageOpen);

  const showBottomNavigation = !isChatMessageOpen;
  return (
    <Container className="account-layout-container flex flex-col min-h-screen">
      <div className="lg:flex justify-between gap-5">
        <aside className="hidden lg:block min-w-[200px] pr-4 bg-background">
          <SidebarNavigation />
        </aside>
        {children}
      </div>
      <AccountContent />
      {showBottomNavigation && <BottomNavigation />}
    </Container>
  );
}
