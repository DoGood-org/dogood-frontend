import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';
import { Section } from '../ui/Section';
import { HighlightText } from '../supportPage/HighlightText';
import { Button } from '../ui/Button';

export const GrantsHero = (): JSX.Element => {
  const t = useTranslations('grantsPage');

  return (
    <Section className="bg-[#6969690A] shadow-xl relative z-10">
      <div className="p-4 md:p-0 md:py-2.5 lg:py-16.75 lg:w-197 mx-auto ">
        <h2 className="text-h2-m text-center mb-5 md:mb-4 lg:text-h2 lg:mb-5">
          {t('grantsData.title')}
        </h2>
        <p className="text-base text-center mb-4 md:mb-8 lg:text-h3 lg:mb-12">
          <HighlightText
            text={t('grantsData.description')}
            highlight={t('grantsData.highlightText')}
          />
        </p>
        <div className="flex flex-col gap-3 md:flex-row md:gap-4 lg:gap-8 justify-center">
          <Button variant="primary" className="w-full md:w-39.75 lg:w-48.25">
            {t('applyBtn')}
          </Button>
          <Button variant="secondary" className="w-full md:w-39.75 lg:w-48.25">
            {t('becomeBtn')}
          </Button>
        </div>
      </div>
    </Section>
  );
};
