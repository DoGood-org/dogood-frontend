'use client';

import { OrganizationDetailedProps, Role } from '@/types';
import { OrganizationDesc } from './OrganizationDesc';
import { OrganizationContent } from './OrganizationContent';
import { JSX } from 'react';
import { UserRoleProvider } from '../providers/UserRoleProvider';
import { Section } from '../ui/Section';

type OrgLayoutProps = {
  organization: OrganizationDetailedProps;
  userRole: Role;
};

export const OrganizationLayout = ({
  organization,
  userRole,
}: OrgLayoutProps): JSX.Element => {
  return (
    <UserRoleProvider role={userRole}>
      <Section>
        <OrganizationDesc organization={organization} />
      </Section>

      <OrganizationContent organization={organization} />
    </UserRoleProvider>
  );
};
