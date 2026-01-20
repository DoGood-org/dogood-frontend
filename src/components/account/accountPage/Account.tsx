import { JSX } from 'react';
import { UserDescription } from './UserDescription';
import { Section } from '@/components/ui/Section';
import { ICurrentUser } from '@/types';

export const Account = ({ user }: { user: ICurrentUser }): JSX.Element => {
  return (
    <Section withContainer={false} className="pt-15 md:pt-16 lg:pt-20">
      <div className="lg:pl-2">
        <UserDescription user={user} />
      </div>
    </Section>
  );
};
