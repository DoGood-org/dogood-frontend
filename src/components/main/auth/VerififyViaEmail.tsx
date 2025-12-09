'use client';
import { AuthTitleSubtitle } from '@/components/main/auth/AuthTitleSubtitle';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

import React, { useEffect, useState } from 'react';
type Props = {
  onResend: () => void;
  onWrongEmail: () => void;
  email?: string;
  nextResendAt: number | null;
};
export const VerifyViaEmail: React.FC<Props> = ({
  onResend,
  email,
  nextResendAt,
}) => {
  const t = useTranslations('auth');
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return (): void => clearInterval(id);
  }, []);

  const isDisabled = nextResendAt !== null && now < nextResendAt;

  const secondsLeft = isDisabled ? Math.ceil((nextResendAt! - now) / 1000) : 0;

  return (
    <div
      className="bg-background-secondary flex flex-col gap-[16px] p-10
    w-full
    md:p-8  md:w-[446px] justify-center items-center text-white rounded-[10px]  shadow-md"
    >
      <div
        className="flex flex-col w-full justify-start
      "
      >
        <AuthTitleSubtitle title={t('verificationRequired')} />

        <div className="flex flex-col gap-6 mb-2 justify-center items-start w-full md:w-auto">
          {' '}
          <span>{email}</span>
          <p className="text-base">{t('verificationGoToEmail')}</p>{' '}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:text-[16px] font-normal w-full">
        <Button
          variant="default"
          className="py-0"
          onClick={onResend}
          disabled={isDisabled}
        >
          <a href="#" className="text-white ">
            {isDisabled ? (
              <p>{`Resend in ${secondsLeft} seconds`}</p>
            ) : (
              <p>{t('didntGetEmail')} </p>
            )}
          </a>
        </Button>
      </div>
    </div>
  );
};
