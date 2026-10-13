'use client';

import {
  IReviewsItem,
  FilterValues,
  ReviewsListProps,
} from '@/types/reviewType';
import { useTranslations } from 'next-intl';
import React, { JSX, useEffect, useState } from 'react';
import { SearchInput } from '../report/SearchInput';
import { OrgNoFound } from '../organizations/OrgNoFound';
import { Slider } from '@/components/ui/Slider';
import { Filter } from '@/components/icons';
import { FilterPanel } from './FilterPanel';
import { ButtonsPanel } from './ButtonsPanel';
import { ActiveFiltersBar } from './ActiveFiltersBar';
import { ReviewItemDesk } from './ReviewItemDesk';
import { ReviewItemMob } from './ReviewItemMob';
import { HeaderItem } from '@/types/reportType';
import { applyFilters } from '@/utils/filterReviews';
import { useMediaQuery } from '@/hooks';
import { format } from 'date-fns';
export const ReviewsList = ({
  reviews,
  itemsPerSlide = 6,
}: ReviewsListProps): JSX.Element => {
  const t = useTranslations('adminReviews');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [activeTab, setActiveTab] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [filteredReviews, setFilteredReviews] =
    useState<IReviewsItem[]>(reviews);
  const [resetKey, setResetKey] = useState(0);

  const HEADER_ITEMS: HeaderItem[] = [
    { label: t('id') },
    { label: t('type') },
    { label: t('author') },
    { label: t('review') },
    { label: t('rating') },
    { label: t('status') },
    { label: t('date') },
  ];

  useEffect(() => {
    setFilteredReviews(applyFilters(reviews, activeTab, searchQuery, filters));
  }, [reviews, activeTab, searchQuery, filters]);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleFilterChange = (newFilters: FilterValues): void => {
    setFilters(newFilters);
  };

  const handleResetFilters = (): void => {
    setFilters({});
    setActiveTab('');
    setSearchQuery('');
    setResetKey((prev) => prev + 1);
  };

  const formatFilterLabel = (
    key: keyof FilterValues,
    value: unknown
  ): string => {
    if (key === 'dateRange' && value && typeof value === 'object') {
      const range = value as { from?: Date; to?: Date };
      const from = range.from ? format(range.from, 'dd MMM') : '';
      const to = range.to ? format(range.to, 'dd MMM') : '';
      return from && to ? `${from} – ${to}` : from;
    }
    return String(value);
  };

  const activeFilters = (
    Object.entries(filters) as [keyof FilterValues, unknown][]
  )
    .filter(([, value]) => {
      if (value == null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'object' && 'from' in (value as object)) {
        return Boolean((value as { from?: Date }).from);
      }
      return true;
    })
    .map(([key, value]) => formatFilterLabel(key, value));

  const handleRemoveFilter = (label: string): void => {
    const newFilters = { ...filters };

    const keyToRemove = (
      Object.keys(newFilters) as (keyof FilterValues)[]
    ).find((k) => formatFilterLabel(k, newFilters[k]) === label);

    if (keyToRemove) {
      delete newFilters[keyToRemove];
      setFilters(newFilters);
      setResetKey((prev) => prev + 1);
    }
  };

  return (
    <>
      <ButtonsPanel activeTab={activeTab} onTabChange={handleTabChange} />

      <div
        className={
          isMobile
            ? 'flex flex-col items-start mb-6 gap-6 w-full'
            : 'flex md:flex-col lg:flex-row items-start mb-6 gap-6 w-full'
        }
      >
        <div
          className={isMobile ? 'flex gap-3' : 'flex gap-6 w-full lg:w-auto'}
        >
          <button
            className="bg-card p-3 rounded-sm h-12 w-12 shrink-0 focus:fill-primary"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5 cursor-pointer" />
          </button>

          <div
            className={
              isMobile
                ? 'flex w-full md:w-[528px]'
                : 'flex flex-1 lg:flex-none lg:w-[360px] min-w-0'
            }
          >
            <SearchInput
              onSearch={handleSearch}
              placeholder={t('searchPlaceholder')}
              className="w-full"
            />
          </div>
        </div>

        {isFilterOpen && (
          <div
            className={
              isMobile
                ? 'flex min-w-0 justify-end items-start w-full'
                : 'flex flex-col gap-2 min-w-0 w-full lg:w-auto lg:flex-1 md:justify-between lg:justify-end items-start'
            }
          >
            <FilterPanel key={resetKey} onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>

      <ActiveFiltersBar
        activeFilters={activeFilters}
        onReset={handleResetFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      {!isMobile && (
        <ul className="lg:w-[1018px] overflow-hidden grid grid-cols-7 gap-2 lg:gap-4 mb-6 bg-card px-6 py-3 rounded-sm font-semibold list-none w-full md:grid-cols-[60px_80px_80px_110px_60px_60px_80px] lg:grid-cols-[100px_150px_150px_250px_80px_80px_80px]">
          {HEADER_ITEMS.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-left justify-between"
            >
              <span>{item.label}</span>
              <span className="text-muted-foreground/30 ml-1">|</span>
            </li>
          ))}
        </ul>
      )}

      {filteredReviews.length === 0 ? (
        <OrgNoFound />
      ) : isMobile ? (
        <ul>
          {filteredReviews.map((review) => (
            <li key={review.id}>
              <ReviewItemMob review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <Slider
          containerClassName="lg:max-w-[1018px]"
          itemClassName="p-0 w-full"
          listClassName="gap-6 w-full"
          showPagination={true}
          items={filteredReviews}
          itemsPerSlide={itemsPerSlide}
          renderItem={(review) => (
            <ReviewItemDesk key={review.id} review={review} />
          )}
        />
      )}
    </>
  );
};
