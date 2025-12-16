'use client';

import { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { BackgroundImage } from '@/components/cookies/BackgroundImage';
import { BackToTopButton } from '@/components/cookies/BackToTopButton';
import { PrivacyList } from './PrivacyList';

export const Privacy = (): JSX.Element => {
  const t = useTranslations('privacy');
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <Section className="pt-6 lg:pt-4">
      <BackgroundImage />
      <div className="relative">
        <h1 className="text-[32px] leading-10 m-0 md:text-[40px] md:leading-[50px] lg:text-h2-d">
          {t('title')}
        </h1>
        <PrivacyList onOpenStateChange={setAccordionOpen} />
        <BackToTopButton show={accordionOpen} />
      </div>
    </Section>
  );
};
