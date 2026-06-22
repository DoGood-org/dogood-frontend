'use client';

import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/zustand/stores/authStore';
import { useTranslations } from 'next-intl';
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
  const { verify, status, user } = authStore();
  const isMounted = useRef(false);
  const hasShownSuccessToast = useRef(false);
  const t = useTranslations('auth');
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      router.replace(`/${locale}/login`);
    }, 3000);

    return (): void => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [status, router, locale]);

  useEffect(() => {
    if (isMounted.current || !code || user?.isEmailVerified) return;

    isMounted.current = true;

    const performVerification = async (): Promise<void> => {
      try {
        await verify(code);
      } catch (e) {
        console.error('Email verification error:', e);
      }
    };

    void performVerification();
  }, [code, verify, user?.isEmailVerified]);

  useEffect(() => {
    if (status === 'authorized') {
      const timer = setTimeout(() => {
        router.replace(`/${locale}/account`);
      }, 2000);
      return (): void => clearTimeout(timer);
    }

    if (status === 'forbidden' || status === 'apiError') {
      const timer = setTimeout(() => {
        router.replace(`/${locale}/login`);
      }, 3000);
      return (): void => clearTimeout(timer);
    }
  }, [status, router, locale]);

  useEffect(() => {
    if (status === 'authenticated' && !hasShownSuccessToast.current) {
      toast.success(t('toast.verifiedSuccess'));
      hasShownSuccessToast.current = true;
    }
  }, [status, t]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      {status === 'loading' && (
        <>
          <p className="text-lg font-semibold">{t('verifyingEmail')}</p>
          <p className="text-sm text-muted-foreground">{t('pleaseWait')}</p>
        </>
      )}

      {status === 'authenticated' && (
        <>
          <p className="text-lg font-semibold text-green-600">
            {t('emailVerifiedSuccess')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('redirectingToLogin', { seconds })}
          </p>
        </>
      )}

      {status === 'apiError' && (
        <>
          <p className="text-lg font-semibold text-red-600">
            {t('verificationFailedTitle')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('verificationFailedSubtitle')}
          </p>

          <button
            className="mt-3 rounded-md border px-3 py-1 text-sm"
            onClick={() => router.replace(`/${locale}`)}
          >
            {t('goToMain')}
          </button>

          <button
            className="mt-3 rounded-md border px-3 py-1 text-sm"
            onClick={() => router.replace(`/${locale}/resendLink`)}
          >
            {t('didntGetEmail')}
          </button>
        </>
      )}
    </div>
  );
}
