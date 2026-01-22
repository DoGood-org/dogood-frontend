'use client';
import React from 'react';
import mocks from './mock.json';
import { Section } from '../ui/Section';
import { useTranslations } from 'next-intl';
import { UserItem } from './UserItem';
import { UserTask } from './UserTask';

export const UsersList = (): React.JSX.Element => {
  const t = useTranslations('reviews');
  return (
    <Section>
      <div className="flex flex-col justify-center mx-auto bg-review-bg md:pl-5 p-4 lg:p-10 rounded-lg lg:max-w-[787px]">
        <UserTask />
        <h2 className="mb-2 text-h2-m md:text-h2 mb-4">{t('taskMembers')}</h2>
        <div className="custom-scrollbar-reviews md:h-[377px] overflow-auto">
          <ul className="flex flex-col gap-4 md:gap-3 md:mr-3">
            {mocks.map((user) => (
              <li key={user.id} className="flex pointer-events-auto">
                <UserItem user={user} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};
