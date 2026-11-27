'use client';

import { useTranslations } from 'next-intl';
import React, { JSX, useState } from 'react';
import { OrgNoFound } from '../organizations/OrgNoFound';
import { Slider } from '@/components/ui/Slider';
import { Star } from '@/components/icons';
import { FilterPanel } from '../../ui/FilterPanel';
import { ButtonsPanel } from './ButtonsPanel';
import { ActiveFiltersBar } from '../../ui/ActiveFiltersBar';
import { ReviewItemDesk } from './ReviewItemDesk';
import { ReviewItemMob } from './ReviewItemMob';
import { HeaderItem } from '@/types/reportType';
import { useMediaQuery } from '@/hooks';
import { format } from 'date-fns';
import { applyReviewsFilters } from '@/utils/filterReviews';
import { getStatusOptions } from '@/utils/getStatusOptions';
import { FilterConfig, FilterValues, ReviewsListProps } from '@/types/admin';
export const ReviewsList = ({
  reviews,
  itemsPerSlide = 6,
}: ReviewsListProps): JSX.Element => {
  const t = useTranslations('adminReviews');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [activeTab, setActiveTab] = useState<string>('');
  const [filters, setFilters] = useState<FilterValues>({});
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
  const ratingOptions = Array.from({ length: 5 }, (_, i) => {
    const value = String(i + 1);
    return {
      value,
      label: (
        <span className="flex items-center gap-2">
          {value} <Star className="fill-transparent w-5 h-5" />
        </span>
      ),
    };
  });
  const filterConfig: FilterConfig[] = [
    {
      type: 'select',
      key: 'status',
      placeholderKey: 'status',
      placeholder: t('status'),
      options: getStatusOptions(t),
      triggerClassName: 'w-22.5 md:w-45 lg:w-75.5',
    },
    {
      type: 'select',
      key: 'rating',
      placeholderKey: 'rating',
      placeholder: t('rating'),
      options: ratingOptions,
      triggerClassName: 'w-22.5 md:w-45 lg:w-75.5',
    },
    { type: 'date', key: 'dateRange', mode: 'range' },
  ];
  const filteredReviews = applyReviewsFilters(reviews, activeTab, filters);

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleFilterChange = (newFilters: FilterValues): void => {
    setFilters(newFilters);
  };

  const handleResetFilters = (): void => {
    setFilters({});
    setActiveTab('');
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
      <div className="flex flex-col gap-3 md:gap-6 ">
        <ButtonsPanel activeTab={activeTab} onTabChange={handleTabChange} />
        <FilterPanel
          config={filterConfig}
          onFilterChange={handleFilterChange}
          key={resetKey}
        />

        <ActiveFiltersBar
          activeFilters={activeFilters}
          onReset={handleResetFilters}
          onRemoveFilter={handleRemoveFilter}
        />
      </div>

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
