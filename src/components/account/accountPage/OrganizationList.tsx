import { JSX } from 'react';
import { OrganizationItem } from './OrganizationItem';
import userData from './user.json';
import { OrganizationProps } from '@/types';

export const OrganizationList = (): JSX.Element => {
  const organizations = userData.organizations as OrganizationProps[];

  return (
    <ul className="">
      {organizations.map((organization, idx) => (
        <li key={idx} className="p-2">
          <OrganizationItem organization={organization} />
        </li>
      ))}
    </ul>
  );
};
