'use client';

import { JSX } from 'react';
import { OrganizationList, Section } from '@/components';
import { useTranslations } from 'next-intl';
import { OrganizationListProps } from '@/types';

export const UserOrganizationSection = ({
  organizations,
}: OrganizationListProps): JSX.Element => {
  const t = useTranslations('account');

  return (
    <Section>
      <h2 className="text-h2 mb-6">{t('organizationSectionTitle')}</h2>
      <OrganizationList organizations={organizations} />
    </Section>
  );
};
