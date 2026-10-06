'use client';
import { useTranslations } from 'next-intl';
import React, { JSX, useCallback, useEffect, useState } from 'react';
import { SearchInput } from '../report/SearchInput';
import { OrgNoFound } from '../organizations/OrgNoFound';
import { Slider } from '@/components/ui/Slider';
import { ReviewItemDesk } from './ReviewItemDesk';
import { FilterValues, IReviewsItem } from '@/types/reviewType';
import { Filter } from '@/components/icons';
import { FilterPanel } from './FilterPanel';
import { ButtonsPanel } from './ButtonsPanel';
import { applyFilters } from '@/utils/filterReviews';
import { HeaderItem } from '@/types/reportType';
import { ActiveFiltersBar } from './ActiveFiltersBar';

export const ReviewsListDesk = ({
  reviews,
}: {
  reviews: IReviewsItem[];
}): JSX.Element => {
  const t = useTranslations('adminReviews');

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

  const handleSearch = useCallback((query: string): void => {
    setSearchQuery(query);
  }, []);

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleFilterChange = (newFilters: FilterValues): void => {
    setFilters(newFilters);
  };

  const handleResetFilters = (): void => {
    setFilters({});
    setResetKey((prev) => prev + 1);
  };

  const activeFilters = Object.values(filters).filter(
    (value): value is string => Boolean(value && value.trim())
  );

  return (
    <>
      <ButtonsPanel activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex md:flex-col lg:flex-row items-start mb-6 gap-6 w-full">
        <div className="flex gap-6 w-full lg:w-auto">
          <button
            className="bg-card p-3 rounded-sm h-12 w-12 shrink-0 focus:fill-primary"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5 cursor-pointer" />
          </button>

          <div className="flex flex-1 lg:flex-none lg:w-[360px] min-w-0">
            <SearchInput
              onSearch={handleSearch}
              placeholder={t('searchPlaceholder')}
              className="w-full"
            />
          </div>
        </div>

        {isFilterOpen && (
          <div className="flex flex-col gap-2 min-w-0 w-full lg:w-auto lg:flex-1 md:justify-between lg:justify-end items-start">
            <FilterPanel key={resetKey} onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>

      <ActiveFiltersBar
        activeFilters={activeFilters}
        onReset={handleResetFilters}
      />

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

      {filteredReviews.length === 0 ? (
        <OrgNoFound />
      ) : (
        <Slider
          containerClassName="lg:max-w-[1018px]"
          itemClassName="p-0 w-full"
          listClassName="gap-6 w-full"
          showPagination={true}
          items={filteredReviews}
          itemsPerSlide={6}
          renderItem={(review, idx) => (
            <ReviewItemDesk key={`${idx}-${review.id}`} review={review} />
          )}
        />
      )}
    </>
  );
};
