'use client';

import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { useRouter } from 'next/navigation';
import { authStore } from '@/zustand/stores/authStore';
import { ForgotPassword } from './ForgotPassword';
import { IAuthResponse } from '@/zustand/services/authService';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

type Props = {
  token: string;
  locale: Tlocale;
  newPassword?: string;
};

export default function ResetPasswordClient({ token }: Props): JSX.Element {
  const router = useRouter();
  const { resetPassword } = authStore();
  const t = useTranslations('auth');

  return (
    <ForgotPassword
      onSubmit={async (data) => {
        const res: IAuthResponse = await resetPassword(token, data.newPassword);

        if (res.ok) {
          toast.success(t('passwordResetSuccess'));
          router.replace('/login');
          return;
        }

        toast.error(res.errorMessage || t('toast.resetPasswordFailed'));
      }}
    />
  );
}
