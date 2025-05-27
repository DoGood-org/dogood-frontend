'use client';
import { Close } from '@/components/icons';
import React, { FC } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { IPropsFilters } from '@/typings/mapTypes';
import { useTranslations } from 'next-intl';
import { DistanceFilter } from './DistanceFilter';
import { Button } from '@/components/ui/Button';

export const Filters: FC<IPropsFilters> = ({ setIsSettingOpen }) => {
  const t = useTranslations('map');

  return (
    <div className="absolute top-[50px] left-0 w-[478px] bg-white -z-10 px-[35px] py-10 rounded-b-[10px]">
      <div className="flex justify-between align-text-bottom mb-[25px]">
        <h3 className="text-xl font-semibold">{t('title')}</h3>
        <Close
          className="w-[22px] h-[21px]"
          onClick={() => {
            setIsSettingOpen(false);
          }}
        />
      </div>
      <h4 className="text-lg font-semibold mb-[13px]">{t('category')}</h4>
      <CategoryFilter />
      <h4 className="text-lg font-semibold mb-[13px]">{t('distance')}</h4>
      <DistanceFilter />
      <div className="flex justify-between">
        <Button variant="outline" size="xl" className="text-lg">
          Cancel
        </Button>
        <Button variant="outline" size="xl" className="text-lg">
          Apply
        </Button>
      </div>
    </div>
  );
};
