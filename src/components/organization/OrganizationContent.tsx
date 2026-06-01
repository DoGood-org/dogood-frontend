'use client';

// import { getUserRole } from '@/lib/getUserRole';
import { ContentProps, OrganizationDetailedProps } from '@/types';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { OrgTasksSection } from '@/components/organization/tasksSection/OrgTasksSection';
import { OrgMemberSection } from '@/components/organization/memberSection/OrgMemberSection';
// import { OrgJoinRequestSection } from '@/components/organization/requestSection/OrgJoinRequestSection';
import { OrgReviewSection } from '@/components/organization/reviewSection/OrgReviewSection';
import { OrgMoreSection } from '@/components/organization/moreSection/OrgMoreSection';
import { OrganizationContentPanel } from './OrganizationContentPanel';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
import { IJoinRequests } from '@/types/joinRequest.type';
// import { OrgJoinRequestClient } from './requestSection/OrgJoinRequestClient';
import { useUserRole } from '../providers/UserRoleProvider';
import { OrgJoinRequestSection } from './requestSection/OrgJoinRequestSection';

export const OrganizationContent = ({
  organization,
  joinRequests,
}: {
  organization: OrganizationDetailedProps;
  joinRequests: IJoinRequests[];
}): JSX.Element => {
  const t = useTranslations('organization');
  const views = t.raw('contentViews') as ContentProps[];
  // const userRole = getUserRole(organization.members);
  const userRole = useUserRole();
  const { canViewRequests } = useOrganizationPermissions(userRole);

  const userViews = views.filter((view) => view.id !== 'requests');
  const visibleViews: ContentProps[] =
    userRole === 'ADMIN' || userRole === 'MODERATOR' ? views : userViews;

  const viewComponents: Record<string, React.ReactNode> = {
    tasks: <OrgTasksSection tasks={organization.tasks} role={userRole} />,
    members: (
      <OrgMemberSection
        members={organization.members}
        role={userRole}
        orgId={organization.id}
      />
    ),
    requests: canViewRequests && (
      // <OrgJoinRequestSection orgId={organization.id} />
      <OrgJoinRequestSection data={joinRequests} />
    ),
    reviews: (
      <OrgReviewSection reviews={organization.reviews} role={userRole} />
    ),
    more: <OrgMoreSection info={organization?.moreInfo} />,
  };

  return (
    <OrganizationContentPanel
      views={visibleViews}
      viewComponents={viewComponents}
      organization={organization}
    />
  );
};
