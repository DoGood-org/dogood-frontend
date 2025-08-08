'use client';

import React from 'react';
import { Container, SidebarNavigation } from '@/components';
import AuthLayout from './AuthLayout';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Container className="account-layout-container flex min-h-screen">
      <aside className="hidden lg:block min-w-[200px] px-4 bg-background">
        <SidebarNavigation />
      </aside>
      <AuthLayout>{children}</AuthLayout>
    </Container>
  );
}
