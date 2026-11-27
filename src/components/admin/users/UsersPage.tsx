import { Section } from '@/components/ui/Section';
import { JSX } from 'react';
import { AdminTabs } from '@/components/admin/navigation/AdminTabs';
import mocks from './mock.json';
import { IAdminUser } from '@/types/admin';
import { UsersList } from './UsersList';

export const UsersPage = async (): Promise<JSX.Element> => {
  const users: IAdminUser[] = mocks.data.users as IAdminUser[];

  return (
    <Section
      withContainer={false}
      className="w-full p-4 min-h-156.75 lg:min-h-234.75 mb-15.75 md:mb-8 lg:mb-0 rounded-lg bg-admin-background lg:p-6 pb-[42px] dark:shadow-none lg:shadow-admin"
    >
      <AdminTabs />
      <UsersList users={users} />
    </Section>
  );
};
