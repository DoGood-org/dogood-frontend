'use client';

import React, { JSX, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { FilterSelect } from './FilterSelect';
import { DateRangePicker } from './DateRangePicker';
import { useTranslations } from 'next-intl';
import Star from '@/components/icons/Star';
import { FilterPanelProps } from '@/types';
import { getStatusOptions } from '@/utils/getStatusOptions';

export const FilterPanel = ({
  onFilterChange,
}: FilterPanelProps): JSX.Element => {
  const t = useTranslations('adminReviews');
  const statusOptions = getStatusOptions(t);

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

  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedRating, setSelectedRating] = useState<string>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const notifyChange = (
    status?: string,
    rating?: string,
    range?: DateRange
  ): void => {
    onFilterChange?.({
      status: status ?? selectedStatus,
      rating: rating ?? selectedRating,
      dateRange: range ?? dateRange,
    });
  };

  const handleStatusChange = (value: string): void => {
    setSelectedStatus(value);
    notifyChange(value, undefined, undefined);
  };

  const handleRatingChange = (value: string): void => {
    setSelectedRating(value);
    notifyChange(undefined, value, undefined);
  };

  const handleDateRangeChange = (range: DateRange | undefined): void => {
    setDateRange(range);
    notifyChange(undefined, undefined, range);
  };

  return (
    <ul className="flex gap-4 md:gap-15 lg:gap-6 rounded-sm">
      <li>
        <FilterSelect
          value={selectedStatus || ''}
          onValueChange={handleStatusChange}
          options={statusOptions}
          placeholderKey="status"
          placeholder="status"
          triggerClassName="w-[99px] md:w-[165px]"
        />
      </li>
      <li>
        <FilterSelect
          value={selectedRating || ''}
          onValueChange={handleRatingChange}
          options={ratingOptions}
          placeholderKey="rating"
          placeholder="rating"
          triggerClassName="w-[99px] md:w-[165px]"
        />
      </li>
      <li>
        <DateRangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          placeholder={t('date')}
        />
      </li>
    </ul>
  );
};
