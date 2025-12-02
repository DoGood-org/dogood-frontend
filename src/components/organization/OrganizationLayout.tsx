'use client';

import { OrganizationDetailedProps } from '@/types';
import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { OrganizationDesc } from '@/components/organization/OrganizationDesc';
import { OrganizationContent } from '@/components/organization/OrganizationContent';

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
