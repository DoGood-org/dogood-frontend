import { getTypesOfGrants } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Section } from '../ui/Section';
import { UniversalTypesList } from './UniversalTypesList';

export const TypesOfGrants = (): React.JSX.Element => {
  const t = useTranslations('grantsPage');
  const TYPESOFGRANTS_LIST = getTypesOfGrants(t);

  const firstColumn = TYPESOFGRANTS_LIST.slice(0, 3);
  const secondColumn = TYPESOFGRANTS_LIST.slice(3);

  return (
    <Section>
      <h2 className="text-h2-m text-center mb-4 md:mb-4 lg:text-h2 lg:mb-5">
        {t('titleOfTypes')}
      </h2>

      {/* Mobile layout: flex column */}
      <UniversalTypesList
        items={TYPESOFGRANTS_LIST}
        className="md:hidden lg:grid lg:grid-cols-3 lg:gap-6"
      />

      {/* Tablet layout: 2 columns with custom order */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden lg:gap-6">
        <UniversalTypesList items={firstColumn} />
        <UniversalTypesList items={secondColumn} />
      </div>
    </Section>
  );
};
