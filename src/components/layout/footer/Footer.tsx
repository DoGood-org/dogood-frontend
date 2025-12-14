'use client';

import React from 'react';
import { SocialLinks } from './SocialLinks';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <footer className="w-full bg-[#111215] py-[36px] lg:py-[32px] mt-auto z-100">
      <Container className="flex flex-col items-center gap-[32px] lg:flex-row lg:justify-between">
        <div>
          <Logo />
        </div>
        <div className="flex flex-col-reverse pb-[32px] lg:pb-[0] gap-[16px] items-center lg:flex-col lg:items-end lg:gap-3">
          <SocialLinks
            className="flex gap-4 lg:gap-6"
            iconClassName="w-[30px] h-[30px] lg:w-[32px] lg:h-[32px] text-[white] hover:text-[#999] transition duration-300"
          />
          <a
            href={`mailto:${t('email')}`}
            className="font-normal text-[16px] lg:text-[18px] text-white hover:text-[#999] duration-300"
          >
            {t('email')}
          </a>
        </div>
      </Container>
      <div className="flex flex-col lg:flex-row justify-center items-center text-center text-[12px] md:text-[14px]  text-white gap-1">
        <div className="flex gap-1 pr-2 border-r border-white">
          <p>© 2025 DoGood. </p>
          <p>{t('allRights')}</p>
        </div>
        <div className="flex justify-center">
          <Link
            href={`/${locale}/privacy`}
            className="block border-r border-white px-2 hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
          >
            {t('privacy')}
          </Link>
          <Link
            href={`/${locale}/terms`}
            className="block border-r border-white px-2 hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
          >
            {t('terms')}
          </Link>
        </div>
        <Link
          href={`/${locale}/cookies`}
          className="pl-2 hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
        >
          {t('cookies')}
        </Link>
      </div>
    </footer>
  );
};
