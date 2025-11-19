'use client';

import { AnimationTabs, Button, Section } from '@/components';
import { Plus } from '@/components/icons';
import { useMediaQuery } from '@/hooks';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { ContentPanelProps } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { JSX, useState } from 'react';

export const AccountContentPanel = ({
  views,
  viewComponents,
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
          <div className="flex flex-col md:flex-row justify-between">
            <AnimationTabs
              views={views}
              activeView={activeView}
              onChange={setActiveView}
              headClass="md:justify-start"
              refClass={locale === 'de' && isMobile ? 'gap-1' : 'gap-4'}
              buttonClass="p-[10px]"
            />
            {activeData?.id === 'task' && (
              <Button
                asChild
                variant="secondary"
                className="gap-[10px] mt-11 md:mt-0 align-right self-end"
              >
                <Link href="/tasks">
                  <Plus className="size-6 fill-current" />
                  {t('task.add')}
                </Link>
              </Button>
            )}
          </div>
          {viewComponents[activeData.id]}
        </div>
      )}
    </Section>
  );
};
