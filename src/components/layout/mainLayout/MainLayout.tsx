// app/components/HydrateAuth.tsx
'use client';

import type { ICurrentUser } from '@/types';
import { authStore } from '@/zustand/stores/authStore';
import { JSX, useEffect } from 'react';

export const MainLayoutContent = ({
  user,
  children,
}: {
  user: ICurrentUser | null;
  children: React.ReactNode;
}): JSX.Element => {
  useEffect(() => {
    const s = authStore.getState();
    if (user) {
      s.user = user;
      s.isLoggedIn = true;
      s.isEmailVerified = user.isEmailVerified;
      s.status = 'authorized';
      console.log('User from server fetch in MainLayoutContent:', user);
    } else {
      s.user = null;
      s.isLoggedIn = false;
      s.isEmailVerified = false;
      s.status = 'forbidden';
      console.log('User from server fetch in MainLayoutContent:', user);
    }
  }, [user]);

  return <>{children}</>;
};
