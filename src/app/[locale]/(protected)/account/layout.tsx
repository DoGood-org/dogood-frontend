'use client';

import { JSX } from 'react';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { Container } from '@/components/ui/Container';
import { SidebarNavigation } from '@/components/account/navigation/SidebarNavigation';
import { AccountContent } from '@/components/account/accountPage/AccountContent';
import { BottomNavigation } from '@/components/account/navigation/BottomNavigation';
import { useAuth } from '@/hooks';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { user } = useAuth();

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
      {user && <AccountContent user={user} />}
      {showBottomNavigation && <BottomNavigation />}
    </Container>
  );
}
