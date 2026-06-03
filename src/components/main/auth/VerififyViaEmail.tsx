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
};

export const VerifyViaEmail: React.FC<Props> = ({
  onResend,
  email,
  onWrongEmail,
  nextResendAt = null,
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

  return (
    <div
      className="bg-background-secondary flex w-full flex-col items-center
      justify-center gap-4 rounded-[10px] p-10 text-white shadow-md
      md:w-[446px] md:p-8"
    >
      <div className="flex w-full flex-col justify-start">
        <AuthTitleSubtitle title={t('verificationRequired')} />

        <div
          className="mb-2 flex w-full flex-col items-start
          justify-center gap-6 md:w-auto"
        >
          <span>{email}</span>

          <p className="text-base">{t('verificationGoToEmail')}</p>
        </div>
      </div>

      <div className="w-full text-[16px] font-normal">
        <Button
          variant="default"
          className="py-0"
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
          Already verified?
          <span className="ml-1 font-bold underline">Log in</span>
        </Link>
      </div>
    </div>
  );
};
