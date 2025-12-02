'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { OrganizationListProps } from '@/types';
import { Section } from '@/components/ui/Section';
import { OrganizationList } from '@/components/account/accountPage/OrganizationList';

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
