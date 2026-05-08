import { OrganizationDetailedProps } from '@/types';
import React, { JSX } from 'react';
import { OrgSearchItem } from './OrgSearchItem';

export const OrgSearchList = ({
  organizations,
}: {
  organizations: OrganizationDetailedProps[];
}): JSX.Element => {
  return (
    <ul className="flex flex-col gap-2">
      {organizations.map((organization) => (
        <li key={organization.id} className="flex items-center gap-4">
          <OrgSearchItem organization={organization} />
        </li>
      ))}
    </ul>
  );
};
