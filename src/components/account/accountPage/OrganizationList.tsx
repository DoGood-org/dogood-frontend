import { JSX } from 'react';
import { OrganizationItem, Slider } from '@/components';
import { OrganizationProps } from '@/types';
import { mockUser } from '@/data/mockUser';

export const OrganizationList = (): JSX.Element => {
  const organizations = mockUser.organizations as OrganizationProps[];

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
