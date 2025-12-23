'use client';

import { useEffect } from 'react';
import { authStore } from '@/zustand/stores/authStore';
import type { ICurrentUser } from '@/types';

export const ProtectedLayoutContent = ({
  user,
  children,
}: {
  user: ICurrentUser | null;
  children: React.ReactNode;
}): React.JSX.Element => {
  useEffect(() => {
    if (user) {
      authStore.setState({
        user,
        isLoggedIn: true,
        isEmailVerified: user.isEmailVerified,
        status: 'authorized',
      });
    } else {
      authStore.setState({
        user: null,
        isLoggedIn: false,
        isEmailVerified: false,
        status: 'forbidden',
      });
    }
  }, [user]);
  if (!user) {
    return <div>Access Denied</div>;
  }
  return <>{children}</>;
};
