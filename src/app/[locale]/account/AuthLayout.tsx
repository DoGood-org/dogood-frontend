'use client';

import { BottomNavigation, Container } from '@/components';
import { useSyncCurrentPage } from '@/hooks/useSyncCurrentPage';
import { navigationStore } from '@/zustand/stores/navigationStore';

import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps): React.ReactNode {
  useSyncCurrentPage();

  const isChatMessageOpen = navigationStore((state) => state.isChatMessageOpen);

  const showBottomNavigation = !isChatMessageOpen;

  return (
    <>
      <Container>
        <div className="flex w-full lg:gap-20 justify-center">
          <div className="flex flex-col flex-grow">{children}</div>
        </div>
        {showBottomNavigation && <BottomNavigation />}
      </Container>
    </>
  );
}
