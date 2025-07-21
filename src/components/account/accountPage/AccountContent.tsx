'use client';

import { AccountContentPanel } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { JSX } from 'react';

export const AccountContent = (): JSX.Element => {
  const { currentPage } = navigationStore();

  return <>{currentPage === 'Account' && <AccountContentPanel />}</>;
};
