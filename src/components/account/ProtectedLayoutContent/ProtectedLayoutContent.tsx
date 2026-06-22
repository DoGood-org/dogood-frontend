'use client';

import { useEffect } from 'react';
import { authStore } from '@/zustand/stores/authStore';
import type { IBannedUser, ICurrentUser } from '@/types';
import { BlockedUserModal } from '../accountPage/BlockedUserModal';
import { useRouter } from 'next/navigation';

type Props = {
  user: ICurrentUser | null;
  bannedUser?: IBannedUser | null;
  children: React.ReactNode;
};

export const ProtectedLayoutContent = ({
  user,
  children,
  bannedUser,
}: Props): React.JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (!user || bannedUser) return;

    authStore.setState({
      user,
      isLoggedIn: true,
      isEmailVerified: user.isEmailVerified,
      status: 'authorized',
    });
  }, [user, bannedUser]);

  const handleCloseBanModal = (): void => {
    authStore.setState({
      user: null,
      isLoggedIn: false,
      isEmailVerified: false,
      status: 'idle',
    });

    router.replace('/login');
  };

  if (bannedUser) {
    return (
      <BlockedUserModal isOpen={!!bannedUser} setIsOpen={handleCloseBanModal} />
    );
  }

  return <>{children}</>;
};
