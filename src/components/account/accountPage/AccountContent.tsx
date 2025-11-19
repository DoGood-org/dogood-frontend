'use client';

import {
  AccountContentPanel,
  AccountTaskList,
  OrganizationList,
  ReviewsList,
} from '@/components';
import { ContentProps, UserDetailedProps } from '@/types';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export const AccountContent = ({
  user,
}: {
  user: UserDetailedProps;
}): JSX.Element => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const isAccountPage = segments[segments.length - 1] === 'account';
  const t = useTranslations('account');
  const views = t.raw('contentViews') as ContentProps[];

  const viewComponents: Record<string, React.ReactNode> = {
    task: <AccountTaskList tasks={user.joinedTasks} />,
    organization: <OrganizationList organizations={user.organizations} />,
    reviews: <ReviewsList reviews={user.reviewsReceived} />,
  };

  return (
    <>
      {isAccountPage && (
        <AccountContentPanel views={views} viewComponents={viewComponents} />
      )}
    </>
  );
};
