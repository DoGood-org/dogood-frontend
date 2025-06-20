'use client';
import { Close } from '@/components/icons';
import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { DistanceFilter, CategoryFilter } from '@/components';
import { Button } from '@/components/ui/Button';
import { FiltersProps } from '@/types/mapType';

export const Filters: FC<FiltersProps> = ({
  setIsSettingOpen,
  selectedCategories,
  onCategoryToggle,
  selectedDistances,
  onDistanceToggle,
}) => {
  const t = useTranslations('map');
  return (
    <div className="absolute lg:top-24 lg:left-0 w-[353px] md:w-[648px] md:h-[682px] lg:w-[487px] lg:h-[722px] bg-card z-[1000] px-[35px] py-10 rounded-xl">
      <div className="flex justify-between align-text-bottom mb-4">
        <h3 className="text-h3">{t('title')}</h3>
        <Close
          className="w-[22px] h-[21px]"
          onClick={() => setIsSettingOpen(false)}
        />
      </div>
      <CategoryFilter
        selectedCategories={selectedCategories}
        onCategoryToggle={onCategoryToggle}
      />
      <DistanceFilter
        selectedDistances={selectedDistances}
        onDistanceToggle={onDistanceToggle}
      />
      <div className="flex justify-between">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsSettingOpen(false)}
        >
          {t('applyBtn')}
        </Button>
        <Button variant="secondary" size="lg">
          {t('cancelBtn')}
        </Button>
      </div>
    </div>
  );
};
