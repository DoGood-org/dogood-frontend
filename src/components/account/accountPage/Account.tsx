import { Section } from '@/components';
import { JSX } from 'react';
import { UserDescription } from './UserDescription';
import { mockUser } from '@/data/mockUser';
// import { mockPublicUsers } from '@/data/mockPublicUsers';

export const Account = (): JSX.Element => {
  // const user = mockPublicUsers.find((user) => user.id === 5);
  return (
    <Section withContainer={false} className="pt-15 md:pt-16 lg:pt-20">
      <div className="lg:pl-2">
        <UserDescription user={mockUser} />
        {/* {user && <UserDescription user={user} />} */}
      </div>
    </Section>
  );
};
