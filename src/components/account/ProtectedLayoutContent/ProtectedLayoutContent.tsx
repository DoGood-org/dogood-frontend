'use client';

import { useEffect } from 'react';
import { authStore } from '@/zustand/stores/authStore';
import type { ICurrentUser } from '@/types';

export const ProtectedLayoutContent = ({
  user,
  children,
}: {
  user: ICurrentUser;
  children: React.ReactNode;
}): React.JSX.Element => {
  useEffect(() => {
    authStore.setState({
      user,
      isLoggedIn: true,
      isEmailVerified: user.isEmailVerified,
      status: 'authorized',
    });
  }, [user]);
  return <>{children}</>;
};
