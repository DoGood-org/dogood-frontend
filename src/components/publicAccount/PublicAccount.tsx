'use client';

import { JSX } from 'react';
import { UserDetailedProps } from '@/types';
import { Section } from '@/components/ui/Section';
import { UserDescription } from '@/components/account/accountPage/UserDescription';
import { UserTaskSection } from './UserTaskSection';
import { UserOrganizationSection } from './UserOrganizationSection';
import { UserReviewSection } from './UserReviewSection';

export const PublicAccount = ({
  user,
}: {
  user: UserDetailedProps;
}): JSX.Element => {
  const { joinedTasks, organizations, reviewsReceived } = user;
  return (
    <>
      <Section className="pt-15 md:pt-16 lg:pt-20">
        <h1 className="sr-only">{user?.name}</h1>
        <div>
          <UserDescription user={user} />
        </div>
      </Section>
      <UserTaskSection tasks={joinedTasks} />
      <UserOrganizationSection organizations={organizations} />
      <UserReviewSection reviews={reviewsReceived} />
    </>
  );
};
