'use client';
import React, { JSX, useState } from 'react';
import { FilterSelect } from './FilterSelect';
import mocks from './mock.json';
import { useTranslations } from 'next-intl';
import Star from '@/components/icons/Star';
import { getStatusOptions } from './StatusOptions';
import { FilterPanelProps } from '@/types';

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
  const reviews = mocks.data.reviews;
  const dateOptions = Array.from(
    new Set(
      reviews.map((review) =>
        new Date(review.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
        })
      )
    )
  ).map((label) => ({ value: label, label }));
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [selectedRating, setSelectedRating] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const notifyChange = (
    status?: string,
    rating?: string,
    date?: string
  ): void => {
    onFilterChange?.({
      status: status || selectedStatus,
      rating: rating || selectedRating,
      date: date || selectedDate,
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
  const handleDateChange = (value: string): void => {
    setSelectedDate(value);
    notifyChange(undefined, undefined, value);
  };
  const filters = [
    {
      key: 'status',
      value: selectedStatus || '',
      onValueChange: handleStatusChange,
      options: statusOptions,
      placeholderKey: 'status',
      placeholder: 'status',
    },
    {
      key: 'rating',
      value: selectedRating || '',
      onValueChange: handleRatingChange,
      options: ratingOptions,
      placeholderKey: 'rating',
      placeholder: 'rating',
    },
    {
      key: 'date',
      value: selectedDate || '',
      onValueChange: handleDateChange,
      options: dateOptions,
      placeholderKey: 'date',
      placeholder: 'date',
    },
  ];
  return (
    <ul className="flex gap-4 md:gap-15 lg:gap-6 rounded-sm">
      {filters.map(({ key, ...props }) => (
        <li key={key}>
          <FilterSelect {...props} triggerClassName="w-[99px] md:w-[165px]" />
        </li>
      ))}
    </ul>
  );
};
