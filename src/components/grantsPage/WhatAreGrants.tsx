import { useTranslations } from 'next-intl';
import React from 'react';
import { Section } from '../ui/Section';
import { getCategoriesGrants, getGoalsOfGrants } from '@/lib/utils';
import { UniversalList } from './UniversalList';

export const WhatAreGrants = (): React.JSX.Element => {
  const t = useTranslations('grantsPage');
  const FORWHOGRANTS_LIST = getCategoriesGrants(t);
  const TYPESOFGRANTS_LIST = getGoalsOfGrants(t);

  return (
    <Section className="lg:px-27">
      <h2 className="text-h2-m text-center mb-4 md:mb-4 lg:text-h2 lg:mb-5">
        {t('title')}
      </h2>
      <p className="text-sm text-center mb-4">{t('description')}</p>
      <p className="text-sm text-center mb-7">{t('description1')}</p>
      <div className="flex flex-col gap-4 md:gap-5 lg:gap-8 md:flex-row md:justify-center">
        <UniversalList items={FORWHOGRANTS_LIST} title={t('forWho.title')} />
        <UniversalList
          items={TYPESOFGRANTS_LIST}
          title={t('whatFinance.title')}
        />
      </div>
    </Section>
  );
};
