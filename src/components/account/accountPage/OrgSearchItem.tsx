import { OrganizationDetailedProps } from '@/types';
import Image from 'next/image';
import { JSX } from 'react';

export const OrgSearchItem = ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): JSX.Element => {
  return (
    <>
      <div className="relative w-[60px] h-[60px] flex-shrink-0">
        <Image
          alt={organization.name}
          src={
            organization.avatar ? organization.avatar : '/account/avatar.png'
          }
          fill
          sizes="60px"
          className="object-cover rounded-md"
        />
      </div>
      <span className="flex-1">{organization.name}</span>
    </>
  );
};
