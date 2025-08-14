'use client';

import { AccountContentPanel } from '@/components';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export const AccountContent = (): JSX.Element => {
  const pathname = usePathname();
  const isAccountPage = pathname === '/account';

  return <>{isAccountPage && <AccountContentPanel />}</>;
};
