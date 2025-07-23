'use client';

import {
  AccountContent,
  BottomNavigation,
  Container,
  PageContent,
  SidebarNavigation,
} from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';

export default function AuthLayout(): React.ReactNode {
  const { currentPage, isChatMessageOpen } = navigationStore();
  return (
    <>
      <Container>
        <div className="flex">
          <SidebarNavigation />
          <div className="flex flex-col flex-grow">
            <PageContent />
          </div>
        </div>
        <AccountContent />
        {(currentPage !== 'Chat' || !isChatMessageOpen) && <BottomNavigation />}
      </Container>
    </>
  );
}
