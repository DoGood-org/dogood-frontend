import {
  AccountContent,
  BottomNavigation,
  Container,
  PageContent,
  SidebarNavigation,
} from '@/components';

import React from 'react';

export default function AuthLayout(): React.ReactNode {
  return (
    <>
      <Container
        className="account-layout-container
        flex flex-col 

      min-h-[calc(100dvh-80px)]"
      >
        <div className="flex w-full lg:gap-20 justify-center">
          <SidebarNavigation />
          <div className="flex flex-col flex-grow">
            <PageContent />
          </div>
        </div>
        <AccountContent />
        <BottomNavigation />
      </Container>
    </>
  );
}
