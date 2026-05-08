import { JSX } from 'react';
import { OrganizationListProps } from '@/types';
import { Slider } from '@/components/ui/Slider';
import { NoOrganizations } from '@/components/account/accountPage/NoOrganizations';
import { OrganizationItem } from '@/components/account/accountPage/OrganizationItem';

export const OrganizationList = ({
  organizations = [],
}: OrganizationListProps): JSX.Element => {
  if (!organizations || !organizations.length) {
    return <NoOrganizations />;
  }

  return (
    <Slider
      itemClassName="p-0"
      listClassName="gap-6"
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
