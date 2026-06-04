'use client';

import { Section } from '@/components/ui/Section';
import { Slider } from '@/components/ui/Slider';
import { JSX } from 'react';
import { OrgItem } from './OrgItem';
import { OrganizationProps } from '@/types';
import { ChatSearch } from '@/components/icons';

export const OrgPage = ({
  organizations,
}: {
  organizations: OrganizationProps[];
}): JSX.Element => {
  return (
    <Section
      withContainer={false}
      className="w-full p-4 rounded-lg bg-admin-background lg:p-6 pb-[42px] lg:shadow-admin dark:shadow-none"
    >
      <div className="flex w-full h-12 gap-2 px-2 py-3 mb-6 rounded-lg bg-admin-card-bg">
        <ChatSearch className="rotate-90 stroke-current size-6" />
        <input
          name="userName"
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full outline-none "
        />
      </div>
      <Slider
        containerClassName="h-[837px]"
        sliderClassName=""
        itemClassName="p-0 bg-admin-card-bg rounded-md"
        listClassName="gap-3"
        buttonsClassName="lg:mt-[7px]"
        items={organizations}
        itemsPerSlide={6}
        renderItem={(organization, idx) => (
          <OrgItem
            key={`${idx}-${organization.name}`}
            organization={organization}
          />
        )}
      />
    </Section>
  );
};
