'use client';

import { getUserRole } from '@/lib/getUserRole';
import { ContentProps, OrganizationDetailedProps } from '@/types';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { OrgTasksSection } from '@/components/organization/tasksSection/OrgTasksSection';
import { OrgMemberSection } from '@/components/organization/memberSection/OrgMemberSection';
import { OrgJoinRequestSection } from '@/components/organization/requestSection/OrgJoinRequestSection';
import { OrgReviewSection } from '@/components/organization/reviewSection/OrgReviewSection';
import { OrgMoreSection } from '@/components/organization/moreSection/OrgMoreSection';
import { OrganizationContentPanel } from '@/components/organization/OrganizationContantPanel';

export const OrganizationContent = ({
  organization,
}: {
  organization: OrganizationDetailedProps;
}): JSX.Element => {
  const t = useTranslations('organization');
  const views = t.raw('contentViews') as ContentProps[];
  const userRole = getUserRole(organization.members);

  const userViews = views.filter((view) => view.id !== 'requests');
  const visibleViews: ContentProps[] =
    userRole === 'ADMIN' || userRole === 'MODERATOR' ? views : userViews;

  const viewComponents: Record<string, React.ReactNode> = {
    tasks: <OrgTasksSection tasks={organization.tasks} role={userRole} />,
    members: (
      <OrgMemberSection members={organization.members} role={userRole} />
    ),
    requests: <OrgJoinRequestSection members={organization.members} />,
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
