'use client';

import { OrganizationContent, OrganizationDesc, Section } from '@/components';
import { OrganizationDetailedProps } from '@/types';
import { JSX } from 'react';

export const OrganizationLayout = ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): JSX.Element => {
  return (
    <>
      <Section>
        <OrganizationDesc organization={organization} />
      </Section>
      <OrganizationContent organization={organization} />
    </>
  );
};
