import { IReviewsItem } from '@/types/reviewType';
import { useTranslations } from 'next-intl';
import React, { JSX, useEffect, useState } from 'react';
import { SearchInput } from '../report/SearchInput';
import { OrgNoFound } from '../organizations/OrgNoFound';
import { ReviewItemMob } from './ReviewItemMob';
import { Filter } from '@/components/icons';
import { FilterPanel } from './FilterPanel';
import { ActiveFiltersBar } from './ActiveFiltersBar';
import { applyFilters } from '@/utils/filterReviews';
import { FilterValues } from '@/types/reviewType';
import { ButtonsPanel } from './ButtonsPanel';

export const ReviewsListMob = ({
  reviews,
}: {
  reviews: IReviewsItem[];
}): JSX.Element => {
  const t = useTranslations('adminReviews');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterValues>({});
  const [filteredReviews, setFilteredReviews] =
    useState<IReviewsItem[]>(reviews);
  const [resetKey, setResetKey] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('');

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setFilteredReviews(applyFilters(reviews, activeTab, searchQuery, filters));
  }, [reviews, activeTab, searchQuery, filters]);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
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
      <div>
        <div className="flex flex-col items-start mb-6 gap-6 w-full">
          <div className="flex gap-3">
            <button
              className="bg-card p-3 rounded-sm h-12 w-12 shrink-0 focus:fill-primary shrink-0"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-5 h-5" />
            </button>

            <div className="flex w-full md:w-[528px]">
              <SearchInput
                onSearch={handleSearch}
                placeholder={t('searchPlaceholder')}
                className="w-full"
              />
            </div>
          </div>

          {isFilterOpen && (
            <div className="flex min-w-0 justify-end items-start w-full">
              <FilterPanel key={resetKey} onFilterChange={handleFilterChange} />
            </div>
          )}
        </div>

        <ActiveFiltersBar
          activeFilters={activeFilters}
          onReset={handleResetFilters}
        />

        {filteredReviews.length === 0 ? (
          <OrgNoFound />
        ) : (
          <ul>
            {filteredReviews.map((review, index) => (
              <li key={index}>
                <ReviewItemMob review={review} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
