import { JSX } from 'react';
import { OrganizationItem, Slider } from '@/components';
import userData from './user.json';
import { OrganizationProps } from '@/types';

export const OrganizationList = (): JSX.Element => {
  const organizations = userData.organizations as OrganizationProps[];

  return (
    <Slider
      items={organizations}
      itemsPerSlide={2}
      renderItem={(organization, idx) => (
        <OrganizationItem
          key={`${idx}-${organization.name}`}
          organization={organization}
        />
      )}
    />
  );
};
