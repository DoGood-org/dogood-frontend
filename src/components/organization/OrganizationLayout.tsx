'use client';

import { OrganizationDetailedProps } from '@/types';
import { JSX } from 'react';
import { Section } from '@/components/ui/Section';
import { OrganizationDesc } from './OrganizationDesc';
import { OrganizationContent } from './OrganizationContent';

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
