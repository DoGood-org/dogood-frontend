'use client';

import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { useRouter } from 'next/navigation';
import { authStore } from '@/zustand/stores/authStore';
import { ForgotPassword } from './ForgotPassword';

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
        console.log('Reset password submitted:', data);
        const res = await resetPassword(token, data.newPassword);
        if (res?.ok || res.status === 200) {
          console.log('Password reset successful, redirecting to login');
          router.replace('/login');
        }

        router.replace('/login');
      }}
    />
  );
}
