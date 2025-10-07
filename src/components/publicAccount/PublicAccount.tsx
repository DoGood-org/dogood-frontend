'use client';

import {
  Section,
  UserDescription,
  UserOrganizationSection,
  UserReviewSection,
  UserTaskSection,
} from '@/components';
import { JSX } from 'react';
import { UserDetailedProps } from '@/types';

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
