'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Star from '@/components/icons/Star';
import { ActiveFiltersBarProps } from '@/types/reviewType';

export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  activeFilters,
  onReset,
  className = '',
  allLabel,
}) => {
  const t = useTranslations('adminReviews');
  const label = allLabel ?? t('all');

  const STATUS_LABEL_MAP: Record<string, string> = {
    'Under consideration': t('pending'),
    Confirmed: t('approved'),
    Rejected: t('rejected'),
  };

  const renderFilter = (value: string): React.ReactNode => {
    if (STATUS_LABEL_MAP[value]) {
      return STATUS_LABEL_MAP[value];
    }

    if (/^\d+$/.test(value)) {
      return (
        <>
          {value}
          <Star className="w-4 h-4 fill-transparent" />
        </>
      );
    }

    return value;
  };

  return (
    <div
      className={`flex flex-wrap justify-start items-center w-full mb-6 ${className}`}
    >
      <button
        type="button"
        onClick={onReset}
        className="px-1 py-1.5 rounded-sm text-btn cursor-pointer hover:font-medium"
      >
        {label}
      </button>

      {activeFilters.map((value, idx) => (
        <span
          key={`${value}-${idx}`}
          className="px-1 py-1.5 rounded-sm text-foreground font-medium flex items-center gap-1"
        >
          | {renderFilter(value)}
        </span>
      ))}
    </div>
  );
};
