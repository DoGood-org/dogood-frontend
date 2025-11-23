'use client';

import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/zustand/stores/authStore';

type Props = {
  code: string;
  locale: Tlocale;
};

export default function VerifyEmailClient({
  code,
  locale,
}: Props): JSX.Element {
  const router = useRouter();
  const { verify, status } = authStore();

  // 1) Call verify ONCE when component mounts / code changes
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        await verify(code);
      } catch (e) {
        console.error('Email verification failed:', e);
      }
    })();

    return (): void => {
      console.log('Cleanup after VerifyEmailClient');
    };
  }, [code, verify]);

  // 2) React to status changes (redirect / UI)
  useEffect(() => {
    if (status === 'authenticated') {
      const t = setTimeout(() => {
        router.replace(`/${locale}/login`);
      }, 2000);
      return (): void => clearTimeout(t);
    }
  }, [status, router, locale]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      {status === 'loading' && (
        <>
          <p className="text-lg font-semibold">Verifying your email…</p>
          <p className="text-sm text-muted-foreground">
            Please wait a couple of seconds.
          </p>
        </>
      )}

      {status === 'authenticated' && (
        <>
          <p className="text-lg font-semibold text-green-600">
            Email verified!
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting you to login…
          </p>
        </>
      )}

      {status === 'apiError' && (
        <>
          <p className="text-lg font-semibold text-red-600">
            Verification failed
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting you to main or resend link
          </p>

          <button
            className="mt-3 rounded-md border px-3 py-1 text-sm"
            onClick={() => router.replace(`/${locale}`)}
          >
            Go to main
          </button>

          <button
            className="mt-3 rounded-md border px-3 py-1 text-sm"
            onClick={() => router.replace(`/${locale}/resendLink`)}
          >
            Resend verification email
          </button>
        </>
      )}
    </div>
  );
}
