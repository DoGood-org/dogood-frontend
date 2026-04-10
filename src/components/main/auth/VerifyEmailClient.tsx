'use client';

import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/zustand/stores/authStore';
import { toast } from 'react-toastify';

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
  const isMounted = useRef(false); // Защита от двойного вызова в dev-режиме

  useEffect(() => {
    // Если запрос уже был отправлен или код пустой — выходим
    if (isMounted.current || !code) return;
    isMounted.current = true;

    const performVerification = async (): Promise<void> => {
      try {
        const res = await verify(code);
        if (res?.user) {
          toast.success('Email verified successfully!');
        } else {
          toast.error('Verification failed or link expired');
        }
      } catch (e) {
        console.error('Email verification error:', e);
        toast.error('Something went wrong');
      }
    };

    void performVerification();
  }, [code, verify]);

  // Редирект при изменении статуса
  useEffect(() => {
    // Если статус изменился на authorized (или как у вас в сторе)
    if (status === 'authorized') {
      const timer = setTimeout(() => {
        router.replace(`/${locale}/account`); // Логичнее в аккаунт, если он уже вошел
      }, 2000);
      return (): void => clearTimeout(timer);
    }

    // Если статус 'forbidden' после попытки — можно отправить на логин
    if (status === 'forbidden') {
      const timer = setTimeout(() => {
        router.replace(`/${locale}/login`);
      }, 3000);
      return (): void => clearTimeout(timer);
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
