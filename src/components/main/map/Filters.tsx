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
    <div className="absolute lg:top-24 lg:left-0 w-[353px] md:w-[648px] md:h-[682px] lg:w-[487px] bg-toggle z-[1000] px-[35px] py-10 rounded-xl">
      <div className="flex justify-between align-text-bottom mb-[25px]">
        <h3 className="text-xl font-semibold">{t('title')}</h3>
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
          variant="outline"
          size="xl"
          className="text-lg"
          onClick={() => setIsSettingOpen(false)}
        >
          {t('applyBtn')}
        </Button>
        <Button variant="outline" size="xl" className="text-lg">
          {t('cancelBtn')}
        </Button>
      </div>
    </div>
  );
};
