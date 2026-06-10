'use client';

import { AuthTitleSubtitle } from '@/components/main/auth/AuthTitleSubtitle';
import { Button } from '@/components/ui/Button';
import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { Link } from '@/i18n/navigation';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

type Props = {
  onResend: () => void;
  onWrongEmail: () => void;
  email?: string;
  nextResendAt?: number | null;
  type?: 'register' | 'reset';
};

export const VerifyViaEmail: React.FC<Props> = ({
  onResend,
  email,
  onWrongEmail,
  nextResendAt = null,
  type = 'reset',
}) => {
  const t = useTranslations('auth');

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return (): void => clearInterval(id);
  }, []);

  const isDisabled = nextResendAt !== null && now < nextResendAt;

  const secondsLeft = isDisabled ? Math.ceil((nextResendAt! - now) / 1000) : 0;

  const titleKey =
    type === 'register' ? 'registerEmailSentTitle' : 'emailSentTitle';

  const descriptionKey =
    type === 'register'
      ? 'registerEmailSentDescription'
      : 'emailSentDescription';

  return (
    <div
      className="bg-background-secondary flex w-full flex-col items-center
      justify-center gap-4 rounded-[10px] p-10 text-white shadow-md
      md:w-[446px] md:p-8"
    >
      <div className="flex w-full flex-col justify-start">
        <AuthTitleSubtitle title={t(titleKey)} />

        <div
          className="mb-2 flex w-full flex-col items-start
          justify-center gap-6 md:w-auto"
        >
          {type === 'register' && <span>{email}</span>}

          <p className="text-base">{t(descriptionKey)}</p>
        </div>
      </div>

      <div className="text-[16px] w-full font-normal">
        <Button
          variant="default"
          className="py-0 w-full"
          onClick={onResend}
          disabled={isDisabled}
        >
          {isDisabled ? (
            <p>{`Resend in ${secondsLeft} seconds`}</p>
          ) : (
            <p>{t('didntGetEmail')}</p>
          )}
        </Button>
      </div>
      {type === 'register' && (
        <div className="flex w-full flex-col gap-3 text-[16px] font-normal">
          <LinkWithArrow
            href="#"
            text={t('wrongEmailAddress')}
            onClick={(e): void => {
              e.preventDefault();

              onWrongEmail();
            }}
          />

          <Link
            href="/login"
            className="flex cursor-pointer items-center gap-1
            self-start text-base text-[#00c1ac]
            transition-all hover:brightness-110"
          >
            {t('alreadyVerified')}
            <span className="ml-1 font-bold underline">{t('loginLink')}</span>
          </Link>
        </div>
      )}
    </div>
  );
};
