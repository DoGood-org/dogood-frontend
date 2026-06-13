import { ShieldSlash } from '@/components/icons';
import { BlockedLogo } from '@/components/ui/BlockedLogo';
import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';

export const BlockedUser = (): JSX.Element => {
  const t = useTranslations('account');
  return (
    <div className="p-10 md:py-15 md:px-10 bg-background z-[9999]">
      <BlockedLogo className="mx-auto mb-4 md:mx-0 lg:mx-auto" />
      <ShieldSlash className="w-18 md:w-25 lg:w-37 h-18 md:h-25 lg:h-37 mx-auto mb-10" />
      <h2 className="text-h2-m md:text-h2 md:px-5 text-center mb-2">
        {t('blockedUser.title')}
      </h2>
      <p className="text-base md:text-h3 text-help opacity-50 text-center mb-10">
        {t('blockedUser.subtitle')}
      </p>
      <div className="bg-card py-8 px-4 md:p-8 rounded-lg mb-6">
        <h3 className="mb-2 text-center md:text-start">
          {t('blockedUser.reason')}
        </h3>
        <span className="flex w-full py-3 px-2 bg-[#FFFCFCE5] text-black">
          Distributing spam
        </span>
      </div>
      <div className="bg-card py-8 px-4 md:p-8 rounded-lg border border-[#EE060680] mb-6 lg:mb-4">
        <ul className="flex flex-col gap-2 opacity-50">
          <li>{t('blockedUser.accountId')}</li>
          <li>{t('blockedUser.date')}</li>
          <li>{t('blockedUser.type')}</li>
        </ul>
      </div>
      <p className="opacity-50 text-center mb-2">
        {t('blockedUser.description')}
      </p>
      <a
        href="mailto:startup.dogood@gmail.com"
        className="flex w-full justify-center font-normal text-md text-btn-hover hover:text-[#999] duration-300"
      >
        startup.dogood@gmail.com
      </a>
    </div>
  );
};
