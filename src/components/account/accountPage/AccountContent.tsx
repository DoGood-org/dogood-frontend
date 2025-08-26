'use client';

import { AccountContentPanel } from '@/components';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export const AccountContent = (): JSX.Element => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const isAccountPage = segments[segments.length - 1] === 'account';

  return <>{isAccountPage && <AccountContentPanel />}</>;
};
