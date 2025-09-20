'use client';
import { AuthTitleSubtitle } from '@/components/main/auth/AuthTitleSubtitle';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

import React from 'react';
type Props = {
  onResend: () => void;
  onWrongEmail: () => void;
  onConfirm: (code: string) => void;
  email?: string;
};
export const VerifyViaEmail: React.FC<Props> = ({
  onResend,
  onWrongEmail,
  email,
}) => {
  const t = useTranslations('auth');

  return (
    <div
      className="bg-background-secondary flex flex-col gap-[16px] p-4 
    
    md:p-8  md:w-[446px] justify-center items-center text-white rounded-[10px]  shadow-md"
    >
      <div
        className="flex flex-col  w-full justify-center items-center mb-4
      md:mb-6
      "
      >
        <AuthTitleSubtitle title={t('verificationRequired')} />

        <div className="flex flex-col gap-6 mb-2 justify-center items-start w-full md:w-auto">
          <p className="text-base font-normal">{t('verificationGoToEmail')}</p>{' '}
          <span>{email}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center  md:text-[16px] font-normal ">
        <Button variant="ghost" className="py-0 h-full" onClick={onResend}>
          <a href="#" className="text-[var(--text-gray)] ">
            <p>{t('didntGetEmail')} </p>
          </a>
        </Button>
        <Button variant="ghost" className="py-0 h-full" onClick={onWrongEmail}>
          <a href="#" className="text-[var(--text-gray)] ">
            <p>{t('madeMistakeInEmail')} </p>
          </a>
        </Button>
      </div>
    </div>
  );
};
