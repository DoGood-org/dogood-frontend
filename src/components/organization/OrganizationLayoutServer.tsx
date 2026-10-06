import { OrganizationDetailedProps } from '@/types';
import { OrganizationLayout } from './OrganizationLayout';
import { JSX } from 'react';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { getUserRoleFromMembers } from '@/lib/getUserRole';

export const OrganizationLayoutServer = async ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): Promise<JSX.Element> => {
  const user = await getServerCurrentUser();
  const userRole = getUserRoleFromMembers(organization.members, user);

  return <OrganizationLayout organization={organization} userRole={userRole} />;
};
