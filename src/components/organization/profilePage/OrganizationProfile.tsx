import { OrganizationDetailedProps } from '@/types';
import React, { JSX } from 'react';
import { OrganizationForm } from './OrganizationForm';
import { Section } from '@/components/ui/Section';

interface IOrganizationProps {
  organization: OrganizationDetailedProps;
}
export const OrganizationProfile = ({
  organization,
}: IOrganizationProps): JSX.Element => {
  return (
    <Section className="">
      <OrganizationForm organization={organization} mode="update" />
    </Section>
  );
};
