'use client';

import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { useRouter } from 'next/navigation';
import { authStore } from '@/zustand/stores/authStore';
import { ForgotPassword } from './ForgotPassword';
import { IAuthResponse } from '@/zustand/services/authService';
import { toast } from 'react-toastify';

type Props = {
  token: string;
  locale: Tlocale;
  newPassword?: string;
};

export default function ResetPasswordClient({ token }: Props): JSX.Element {
  const router = useRouter();
  const { resetPassword } = authStore();

  return (
    <ForgotPassword
      onSubmit={async (data) => {
        console.log('Reset password submitted:', data, token);
        const res: IAuthResponse = await resetPassword(token, data.newPassword);
        if (res.ok) {
          toast.success('Password reset successfully');
          router.replace('/login');
        }
        toast.error('Failed to reset password');
      }}
    />
  );
}
