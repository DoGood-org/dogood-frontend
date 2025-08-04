'use client';

import { BottomNavigation, Container, SidebarNavigation } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';

import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps): React.ReactNode {
  const { currentPage, isChatMessageOpen } = navigationStore();
  const showBottomNavigation = currentPage !== 'Chat' || !isChatMessageOpen;

  return (
    <>
      <Container
        className="account-layout-container
        flex flex-col 

      min-h-[calc(100dvh-80px)]"
      >
        <div className="flex w-full lg:gap-20 justify-center">
          <SidebarNavigation />
          <div className="flex flex-col flex-grow">{children}</div>
        </div>
        {showBottomNavigation && <BottomNavigation />}
      </Container>
    </>
  );
}
