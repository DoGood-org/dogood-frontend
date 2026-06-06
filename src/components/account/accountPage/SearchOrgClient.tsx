'use client';

import { CloseIcon, Search } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import React, { JSX, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { OrgSearchList } from './OrgSearchList';
import { fetchOrganizationsByName } from '@/facades/organizationFacade';
import type { OrganizationDetailedProps } from '@/types';

interface ISearchOrg {
  setIsSearchOpen: (arg0: boolean) => void;
}

export const SearchOrgClient = ({
  setIsSearchOpen,
}: ISearchOrg): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>('');
  const [organizations, setOrganizations] = useState<
    OrganizationDetailedProps[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations('settings');

  const debouncedSearchQuery: string = useDebounce(searchInput, 500);

  useEffect((): void => {
    const queryFromUrl = searchParams.get('search') || '';
    setSearchInput(queryFromUrl);
  }, [searchParams]);

  useEffect((): void => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchQuery && debouncedSearchQuery.trim()) {
      params.set('search', debouncedSearchQuery);
    } else {
      params.delete('search');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearchQuery, router, searchParams]);

  useEffect((): void => {
    const queryFromUrl = searchParams.get('search');

    const fetchOrganizations = async (): Promise<void> => {
      if (!queryFromUrl || !queryFromUrl.trim()) {
        setOrganizations([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await fetchOrganizationsByName(queryFromUrl);
        setOrganizations(results || []);
      } catch (error) {
        console.error('Search failed:', error);
        setOrganizations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, [searchParams]);

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
        <OrgSearchList organizations={organizations} />
      )}
    </div>
  );
};
