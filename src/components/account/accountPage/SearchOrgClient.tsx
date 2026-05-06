'use client';

import { CloseIcon, Search } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import React, { JSX, useEffect, useState } from 'react';
import { OrgSearchList } from './OrgSearchList';
import { useSearchStore } from '@/zustand/stores/searchStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslations } from 'next-intl';

interface ISearchOrg {
  setIsSearchOpen: (arg0: boolean) => void;
}

export const SearchOrgClient = ({
  setIsSearchOpen,
}: ISearchOrg): JSX.Element => {
  const {
    organizations,
    isLoading,
    searchOrganizations,
    clearOrganizations,
    setSearchQuery,
  } = useSearchStore();

  const [searchInput, setSearchInput] = useState<string>('');
  const t = useTranslations('settings');
  const debouncedSearchQuery: string = useDebounce(searchInput, 500);

  useEffect((): void => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  useEffect((): void => {
    if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
      searchOrganizations();
    } else {
      clearOrganizations();
    }
  }, [debouncedSearchQuery, searchOrganizations, clearOrganizations]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="w-full bg-card rounded-xl p-6">
      <div className="flex justify-between mb-10">
        <h2>Search</h2>
        <CloseIcon className="w-6 h-6" onClick={() => setIsSearchOpen(false)} />
      </div>
      <div className="flex gap-2 items-center justify-center border-b-2 border-foreground mb-6">
        <Search className="rotate-90 w-6 h-6 fill-foreground" />
        <Input
          value={searchInput}
          onChange={handleInputChange}
          placeholder={t('placeholder')}
          className="border-0 focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <OrgSearchList organizations={organizations || []} />
      )}
    </div>
  );
};
