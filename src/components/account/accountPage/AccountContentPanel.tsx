'use client';

import {
  AnimationTabs,
  OrganizationList,
  ReviewsList,
  Section,
  AccountTaskList,
} from '@/components';
import { useMediaQuery } from '@/hooks';
import { ContentProps } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { JSX, useState } from 'react';

export const AccountContentPanel = (): JSX.Element => {
  const t = useTranslations('account');
  const locale = useLocale();
  const views = t.raw('contentViews') as ContentProps[];
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [activeView, setActiveView] = useState(views[0].view);

  const activeData = views.find(({ view }) => view === activeView);

  const viewComponents: Record<string, React.ReactNode> = {
    task: <AccountTaskList />,
    organization: <OrganizationList />,
    reviews: <ReviewsList />,
  };

  return (
    <Section withContainer={false}>
      <h2 className="text-h2">{activeView}</h2>
      {activeData && (
        <div className="mt-11 flex flex-col gap-5 transition-opacity duration-500 ease-in-out opacity-100">
          <div>
            <AnimationTabs
              views={views}
              activeView={activeView}
              onChange={setActiveView}
              headClass="md:justify-start"
              refClass={locale === 'de' && isMobile ? 'gap-1' : 'gap-4'}
              buttonClass="p-[10px]"
            />
          </div>
          {viewComponents[activeData.id]}
        </div>
      )}
    </Section>
  );
};
