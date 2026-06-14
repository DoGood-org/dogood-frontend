'use client';

import { useEffect, useRef, useState } from 'react';
import { authStore } from '@/zustand/stores/authStore';
import type { IBannedUser, ICurrentUser } from '@/types';
import { BlockedUserModal } from '../accountPage/BlockedUserModal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

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
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const t = useTranslations('auth');
  const router = useRouter();

  const shownToasts = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!user || bannedUser) return;

    authStore.setState({
      user,
      isLoggedIn: true,
      isEmailVerified: user.isEmailVerified,
      status: 'authorized',
    });

    if (!shownToasts.current.has('login-success')) {
      toast.success(t('toast.loginSuccess'));
      shownToasts.current.add('login-success');
    }
  }, [user, bannedUser, t]);

  useEffect(() => {
    if (!bannedUser) return;

    setIsBanModalOpen((prev) => prev || true);

    if (!shownToasts.current.has('ban-error')) {
      toast.error(t('toast.banned'));
      shownToasts.current.add('ban-error');
    }
  }, [bannedUser, t]);

  const handleCloseBanModal = (): void => {
    setIsBanModalOpen(false);

    authStore.setState({
      user: null,
      isLoggedIn: false,
      isEmailVerified: false,
      status: 'idle',
    });

    router.replace('/login');
  };

  return (
    <>
      {bannedUser ? null : children}

      <BlockedUserModal
        isOpen={isBanModalOpen}
        setIsOpen={handleCloseBanModal}
      />
    </>
  );
};
