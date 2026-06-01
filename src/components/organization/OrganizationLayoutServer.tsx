import { OrganizationDetailedProps } from '@/types';
import { OrganizationLayout } from './OrganizationLayout';
import { getJoinRequests } from '@/services/joinRequestService';
import { JSX } from 'react';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { getUserRoleFromMembers } from '@/lib/getUserRole';
// import { IJoinRequests } from '@/types/joinRequest.type';

export const OrganizationLayoutServer = async ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): Promise<JSX.Element> => {
  const result = await getJoinRequests(organization.id);
  console.log(result);
  const user = await getServerCurrentUser();
  const userRole = getUserRoleFromMembers(organization.members, user);

  // let joinRequests: IJoinRequests[] = [];

  // try {
  //   const result = await getJoinRequests(organization.id);
  //   if (result.ok) joinRequests = result.data ?? [];
  // } catch (e) {
  //   console.log('JOIN REQUEST ERROR', e);
  // }

  return (
    <OrganizationLayout
      organization={organization}
      joinRequests={result.ok ? (result.data ?? []) : []}
      userRole={userRole}
      // joinRequests={joinRequests}
    />
  );
};
