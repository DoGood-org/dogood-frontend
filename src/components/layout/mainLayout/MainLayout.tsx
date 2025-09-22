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
    if (user) {
      s.user = user;
      s.isLoggedIn = true;
      s.isEmailVerified = user.isEmailVerified;
      s.status = 'authorized';
    } else {
      s.user = null;
      s.isLoggedIn = false;
      s.isEmailVerified = false;
      s.status = 'forbidden';
    }
  }, [user]);
  if (!user) {
    console.log('No user in MainLayoutContent');
  }
  console.log('User in MainLayoutContent:', user);
  return <>{children}</>;
};
