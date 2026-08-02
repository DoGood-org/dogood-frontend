'use client';

import { ContentProps, OrganizationDetailedProps } from '@/types';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { OrgTasksSection } from '@/components/organization/tasksSection/OrgTasksSection';
import { OrgMemberSection } from '@/components/organization/memberSection/OrgMemberSection';
import { OrgReviewSection } from '@/components/organization/reviewSection/OrgReviewSection';
import { OrgMoreSection } from '@/components/organization/moreSection/OrgMoreSection';
import { OrganizationContentPanel } from './OrganizationContentPanel';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
import { useUserRole } from '../providers/UserRoleProvider';
import { OrgJoinRequestSection } from './requestSection/OrgJoinRequestSection';
import { useJoinRequests } from '@/hooks/useJoinRequests';

export const OrganizationContent = ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): JSX.Element => {
  const t = useTranslations('organization');
  const views = t.raw('contentViews') as ContentProps[];
  const userRole = useUserRole();
  const { canViewRequests } = useOrganizationPermissions(userRole);

  const { joinRequests, approve, reject } = useJoinRequests(organization.id);

  const userViews = views.filter((view) => view.id !== 'requests');
  const visibleViews: ContentProps[] = canViewRequests ? views : userViews;

  const viewComponents: Record<string, React.ReactNode> = {
    tasks: <OrgTasksSection tasks={organization.tasks} role={userRole} />,
    members: (
      <OrgMemberSection
        members={organization.members}
        orgId={organization.id}
      />
    ),
    requests: canViewRequests && (
      <OrgJoinRequestSection
        onApprove={approve}
        onReject={reject}
        data={joinRequests}
      />
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
