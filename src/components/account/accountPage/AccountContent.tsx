'use client';

import {
  AccountContentPanel,
  AccountTaskList,
  OrganizationList,
  ReviewsList,
} from '@/components';
import { ContentProps } from '@/types';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';
import { mockUser } from '@/data/mockUser';

export const AccountContent = (): JSX.Element => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const isAccountPage = segments[segments.length - 1] === 'account';
  const t = useTranslations('account');
  const views = t.raw('contentViews') as ContentProps[];

  const viewComponents: Record<string, React.ReactNode> = {
    task: <AccountTaskList tasks={mockUser.joinedTasks} />,
    organization: <OrganizationList organizations={mockUser.organizations} />,
    reviews: <ReviewsList reviews={mockUser.reviewsReceived} />,
  };

  return (
    <>
      {isAccountPage && (
        <AccountContentPanel views={views} viewComponents={viewComponents} />
      )}
    </>
  );
};
