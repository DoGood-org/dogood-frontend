'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!user || bannedUser) return;
    authStore.setState({
      user,
      isLoggedIn: true,
      isEmailVerified: user.isEmailVerified,
      status: 'authorized',
    });
  }, [user, bannedUser]);

  useEffect(() => {
    if (!user || bannedUser) return;
    const hasShown = sessionStorage.getItem('toast_login_success');
    if (!hasShown) {
      toast.success(t('toast.loginSuccess'));
      sessionStorage.setItem('toast_login_success', 'true');
    }
  }, [user, bannedUser, t]);

  useEffect(() => {
    if (!bannedUser) return;
    setIsBanModalOpen(true);
    const hasShownBan = sessionStorage.getItem('toast_ban');
    if (!hasShownBan) {
      toast.error(t('toast.banned'));
      sessionStorage.setItem('toast_ban', 'true');
    }
  }, [bannedUser, t]);

  const handleCloseBanModal = (): void => {
    setIsBanModalOpen(false);
    sessionStorage.removeItem('toast_login_success');
    sessionStorage.removeItem('toast_ban');
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
