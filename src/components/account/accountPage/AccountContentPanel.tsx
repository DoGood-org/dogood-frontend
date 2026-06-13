'use client';

import { Plus } from '@/components/icons';
import { AnimationTabs } from '@/components/ui/AnimationTabs';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { useMediaQuery } from '@/hooks';
import { useRouteMatch } from '@/hooks/useRouteMatch';
import { ContentPanelProps } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { JSX, useState } from 'react';
import { AddOrgModal } from './AddOrgModal';
import { SearchOrg } from './SearchOrg';
import { BlockedUserModal } from './BlockedUserModal';

export const AccountContentPanel = ({
  views,
  viewComponents,
}: ContentPanelProps): JSX.Element => {
  const t = useTranslations('account');
  const locale = useLocale();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isPublicProfilePage = useRouteMatch('/profile');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  {
    /* After delete */
  }
  const [isBlockedOpen, setIsBlockedOpen] = useState(false);

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
              <>
                {/* After delete */}
                <Button
                  variant="secondary"
                  className="gap-[10px] mt-11 md:mt-0 align-right self-end"
                  onClick={() => setIsBlockedOpen(!isBlockedOpen)}
                >
                  Block user
                </Button>
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
              </>
            )}
            {activeData?.id === 'organization' && (
              <div className="flex gap-4 juctify-end">
                <Button
                  variant="primary"
                  className="gap-[10px] mt-11 md:mt-0 align-right self-end"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  {t('createOrgButton')}
                </Button>
                <Button
                  variant="primary"
                  className="gap-[10px] mt-11 md:mt-0 align-right self-end"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  {t('searchOrgButton')}
                </Button>
              </div>
            )}
          </div>
          {isSearchOpen && activeData?.id === 'organization' && (
            <SearchOrg setIsSearchOpen={setIsSearchOpen} />
          )}
          {viewComponents[activeData.id]}
        </div>
      )}
      {isModalOpen && (
        <AddOrgModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}

      {/* After delete */}
      {isBlockedOpen && (
        <BlockedUserModal isOpen={isBlockedOpen} setIsOpen={setIsBlockedOpen} />
      )}
    </Section>
  );
};
