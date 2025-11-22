// app/components/HydrateAuth.tsx
'use client';

import { JSX, useEffect } from 'react';
import { authStore } from '@/zustand/stores/authStore';
import type { ICurrentUser } from '@/types';

export const MainLayoutContent = ({
  user,
  children,
}: {
  user: ICurrentUser | null;
  children: React.ReactNode;
}): JSX.Element => {
  useEffect(() => {
    const s = authStore.getState();
    if (!user) {
      s.user = null;
      s.isLoggedIn = false;
      s.isEmailVerified = false;
      s.status = 'forbidden';
      console.log('Not a user in MainLayoutContent');
      return;
    }

    s.user = user;
    s.isLoggedIn = true;
    s.isEmailVerified = user.isEmailVerified;
    s.status = 'authorized';

    console.log('User from server fetch in MainLayoutContent:', user);
  }, [user]);

  return <>{children}</>;
};
