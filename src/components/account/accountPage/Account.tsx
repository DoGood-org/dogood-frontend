import { Section } from '@/components';
import { JSX } from 'react';
import { UserDescription } from './UserDescription';

export const Account = (): JSX.Element => {
  return (
    <Section withContainer={false} className="pt-15 md:pt-16 lg:pt-20">
      <div className="lg:pl-[88px]">
        <UserDescription />
      </div>
    </Section>
  );
};
