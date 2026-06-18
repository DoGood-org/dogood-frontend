'use client';

import { Section } from '@/components/ui/Section';
import { OrgListSkeleton } from './OrgListSkeleton';
import { OrgList } from './OrgList';
import { OrgNoFound } from './OrgNoFound';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { useMediaQuery } from '@/hooks';
import { JSX } from 'react';
import { OrganizationSearch } from './OrganizationSearch';

export const OrgPage = (): JSX.Element => {
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const limit = isMobile ? 4 : 6;

  const {
    input: searchInput,
    search,
    setInput: setSearchInput,
  } = useDebouncedSearch();

  const {
    organizations,
    pagination,
    page,
    // isLoading,
    isFetchingMore,
    loadMoreRef,
    isInitialLoading,
    // isPageLoading,
    setPage,
  } = useOrganizations({
    search,
    limit,
    isDesktop,
  });

  return (
    <Section
      withContainer={false}
      className="w-full p-4 min-h-[627px] md:min-h-[756px] mb-[63px] md:mb-8 rounded-lg bg-admin-background lg:p-6 pb-[42px] dark:shadow-none  lg:shadow-admin"
    >
      <OrganizationSearch value={searchInput} onChange={setSearchInput} />
      {isInitialLoading ? (
        <OrgListSkeleton count={limit} />
      ) : organizations.length === 0 ? (
        <OrgNoFound />
      ) : (
        <OrgList
          organizations={organizations}
          pagination={pagination}
          page={page}
          isDesktop={isDesktop}
          isFetchingMore={isFetchingMore}
          // isPageLoading={isPageLoading}
          loadMoreRef={loadMoreRef}
          onPageChange={setPage}
          // limit={limit}
        />
      )}
    </Section>
  );
};
