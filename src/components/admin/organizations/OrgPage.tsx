'use client';

import { JSX, useEffect } from 'react';

import { Section } from '@/components/ui/Section';
import { OrgList } from './OrgList';
import { OrgListSkeleton } from './OrgListSkeleton';
import { OrgNoFound } from './OrgNoFound';
import { OrganizationSearch } from './OrganizationSearch';

import { useMediaQuery } from '@/hooks';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { useOrganizationFilters } from '@/zustand/selectors/organizationSelectors';
import { useOrganizationFiltersPersistence } from '@/hooks/useOrganizationFilterPersistence';

export const OrgPage = (): JSX.Element => {
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const limit = isMobile ? 4 : 6;

  const {
    search: storedSearch,
    page,
    setSearch,
    setPage,
  } = useOrganizationFilters();

  const { resetFilters } = useOrganizationFilters();

  const { restoreFromStorage } = useOrganizationFiltersPersistence();

  const {
    input: searchInput,
    search: debouncedSearch,
    setInput: setSearchInput,
  } = useDebouncedSearch({
    initialValue: storedSearch,
  });

  useEffect((): void => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  useEffect(() => {
    const restored = restoreFromStorage();

    if (!restored) {
      resetFilters();
    }
  }, [resetFilters, restoreFromStorage]);

  const {
    organizations,
    pagination,
    isFetchingMore,
    loadMoreRef,
    isInitialLoading,
  } = useOrganizations({
    search: storedSearch,
    page,
    setPage,
    limit,
    isDesktop,
  });

  return (
    <Section
      withContainer={false}
      className="w-full p-4 min-h-[627px] md:min-h-[756px] mb-[63px] md:mb-8 lg:mb-0 rounded-lg bg-admin-background lg:p-6 pb-[42px] dark:shadow-none lg:shadow-admin"
    >
      <OrganizationSearch value={searchInput} onChange={setSearchInput} />

      {isInitialLoading ? (
        <OrgListSkeleton count={limit} />
      ) : organizations.length === 0 && pagination !== null ? (
        <OrgNoFound />
      ) : (
        <OrgList
          organizations={organizations}
          pagination={pagination}
          page={page}
          isDesktop={isDesktop}
          isFetchingMore={isFetchingMore}
          loadMoreRef={loadMoreRef}
          onPageChange={setPage}
        />
      )}
    </Section>
  );
};
