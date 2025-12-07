'use client';

import { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { CookiesList } from './CookiesList';
import { BackgroundImage } from './BackgroundImage';
import BackToTopButton from './BackToTopButton';

export const Cookies = (): JSX.Element => {
  const t = useTranslations('cookies');
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <Section className="pt-6 lg:pt-4">
      <BackgroundImage />
      <div className="relative">
        <h1 className="text-lg font-light m-0 pb-[24px] md:text-[40px] md:leading-[50px] lg:text-h2-d lg:pb-[80px]">
          {t('title')}
        </h1>
        <CookiesList onOpenStateChange={setAccordionOpen} />
        <BackToTopButton show={accordionOpen} />
      </div>
    </Section>
  );
};
