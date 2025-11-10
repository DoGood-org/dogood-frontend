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
import { JSX, useMemo, useState } from 'react';

export const AccountContent = ({
  user,
}: {
  user: UserDetailedProps;
}): JSX.Element => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const isAccountPage = segments[segments.length - 1] === 'accountOld';
  const t = useTranslations('account');
  const views = t.raw('contentViews') as ContentProps[];
  const [filter, setFilter] = useState('ALL');

  const filteredTasks = useMemo(() => {
    if (filter === 'ALL') return user.joinedTasks;
    return user?.joinedTasks?.filter((task) => task.status === filter);
  }, [filter, user.joinedTasks]);

  const viewComponents: Record<string, React.ReactNode> = {
    task: <AccountTaskList tasks={filteredTasks} />,
    organization: <OrganizationList organizations={user.organizations} />,
    reviews: <ReviewsList reviews={user.reviewsReceived} />,
  };

  return (
    <>
      {isAccountPage && (
        <AccountContentPanel
          views={views}
          viewComponents={viewComponents}
          onFilterChange={setFilter}
        />
      )}
    </>
  );
};
