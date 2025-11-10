'use client';

import { AnimationTabs, Section, TaskFilter } from '@/components';
import { useMediaQuery } from '@/hooks';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { ContentPanelProps } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { JSX, useState } from 'react';

export const AccountContentPanel = ({
  views,
  viewComponents,
  onFilterChange,
}: ContentPanelProps): JSX.Element => {
  const t = useTranslations('account');
  const locale = useLocale();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isPublicProfilePage = useRouteMatch('/profile');

  const [activeView, setActiveView] = useState(views[0].view);
  const activeData = views.find(({ view }) => view === activeView);

  return (
    <Section withContainer={isPublicProfilePage}>
      <h2 className="text-h2">
        {isPublicProfilePage ? `${t('taskSectionTitle')}` : `${activeView}`}
      </h2>
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
          {activeData?.id === 'task' && (
            <TaskFilter
              role="ADMIN"
              onChange={(status) => onFilterChange(status)}
            />
          )}
          {viewComponents[activeData.id]}
        </div>
      )}
    </Section>
  );
};
