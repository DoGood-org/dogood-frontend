'use client';

import React, { JSX, useState, useEffect, useRef, useCallback } from 'react';
import { Search } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslations } from 'next-intl';
import { SearchInputProps } from '@/types/reportType';

export const SearchInput = ({
  onSearch,
  placeholder,
  className = '',
  debounceDelay = 300,
}: SearchInputProps): JSX.Element => {
  const t = useTranslations('adminReport');
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearchQuery: string = useDebounce(searchInput, debounceDelay);

  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  const handleSearch = useCallback((query: string) => {
    onSearchRef.current(query);
  }, []);

  useEffect(() => {
    handleSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={`relative flex-1 ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 fill-foreground rotate-90" />
      <Input
        value={searchInput}
        onChange={handleInputChange}
        placeholder={placeholder || t('searchPlaceholder') || 'Search...'}
        className="pl-10 py-2 w-full border border-none focus:ring-card bg-card rounded-sm placeholder:text-foreground"
      />
    </div>
  );
};
