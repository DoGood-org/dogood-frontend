import { JSX } from 'react';
import { NoOrganizations, OrganizationItem, Slider } from '@/components';
import { OrganizationListProps } from '@/types';

export const OrganizationList = ({
  organizations = [],
}: OrganizationListProps): JSX.Element => {
  return (
    <>
      {organizations.length ? (
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
      ) : (
        <NoOrganizations />
      )}
    </>
  );
};
