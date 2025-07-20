import { Section } from '@/components';
import { JSX } from 'react';

export const Account = (): JSX.Element => {
  return (
    <Section withContainer={false} className="pt-15 md:pt-16 lg:pt-20">
      <div className="pl-[88px]">
        <p>UserDecription</p>
      </div>
    </Section>
  );
};
