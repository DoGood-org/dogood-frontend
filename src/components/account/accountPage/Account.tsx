import { Section } from '@/components';
import { JSX } from 'react';
import { UserDescription } from './UserDescription';
import { mockUser } from '@/data/mockUser';

export const Account = (): JSX.Element => {
  return (
    <Section withContainer={false} className="pt-15 md:pt-16 lg:pt-20">
      <div className="lg:pl-2">
        <UserDescription user={mockUser} />
      </div>
    </Section>
  );
};
