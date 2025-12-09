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

export default function ResetPasswordClient({
  token,
  locale,
}: Props): JSX.Element {
  const router = useRouter();
  const { resetPassword, status } = authStore();

  return (
    // <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
    //   {status === 'loading' && (
    //     <>
    //       <p className="text-lg font-semibold">Verifying your email…</p>
    //       <p className="text-sm text-muted-foreground">
    //         Please wait a couple of seconds.
    //       </p>
    //     </>
    //   )}

    //   {status === 'authenticated' && (
    //     <>
    //       <p className="text-lg font-semibold text-green-600">
    //         Email verified!
    //       </p>
    //       <p className="text-sm text-muted-foreground">
    //         Redirecting you to login…
    //       </p>
    //     </>
    //   )}

    //   {status === 'apiError' && (
    //     <>
    //       <p className="text-lg font-semibold text-red-600">
    //         Verification failed
    //       </p>
    //       <p className="text-sm text-muted-foreground">
    //         Redirecting you to main or resend link
    //       </p>

    //       <button
    //         className="mt-3 rounded-md border px-3 py-1 text-sm"
    //         onClick={() => router.replace(`/${locale}`)}
    //       >
    //         Go to main
    //       </button>

    //       <button
    //         className="mt-3 rounded-md border px-3 py-1 text-sm"
    //         onClick={() => router.replace(`/${locale}/resendLink`)}
    //       >
    //         Resend verification email
    //       </button>
    //     </>
    //   )}
    // </div>
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
