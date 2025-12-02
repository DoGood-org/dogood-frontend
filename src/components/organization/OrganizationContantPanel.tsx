'use client';

import { useMediaQuery } from '@/hooks';
import { OrganizationContelPanelProps } from '@/types';
import { useLocale } from 'next-intl';
import { JSX, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { AnimationTabs } from '@/components/ui/AnimationTabs';

export const OrganizationContentPanel = ({
  views,
  viewComponents,
}: OrganizationContelPanelProps): JSX.Element => {
  const locale = useLocale();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [activeView, setActiveView] = useState(views[0].view);
  const activeData = views.find(({ view }) => view === activeView);

  return (
    <Section className="pt-[26px] md:pt-[38px]">
      {activeData && (
        <div className="flex flex-col gap-12 transition-opacity duration-500 ease-in-out opacity-100">
          <AnimationTabs
            views={views}
            activeView={activeView}
            onChange={setActiveView}
            headClass="flex-wrap md:justify-start"
            refClass={locale === 'de' && isMobile ? 'gap-1' : 'gap-4'}
            buttonClass="p-[10px]"
          />
          {viewComponents[activeData.id]}
        </div>
      )}
    </Section>
  );
};
