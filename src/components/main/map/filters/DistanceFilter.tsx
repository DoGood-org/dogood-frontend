'use client';
import { LineDivider } from '@/components/main/map/filters/LineDivider';
import { Button } from '@/components/ui/Button';
import { getDistancesList } from '@/lib/utils';
import { IDistanceFilter } from '@/types/filter.type';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';

export const DistanceFilter = (): JSX.Element => {
  const t = useTranslations('map');
  const { setDistanceFilter, distanceFilter } = useFilterStore();

  return (
    <>
      <h4 className="text-base">{t('distance')}</h4>
      <LineDivider className="flex w-full mb-4 bg-text-gray h-[1px]" />
      <ul className="flex gap-2 flex-wrap w-full mb-[80px]">
        {getDistancesList(t).map((item) => {
          const isActive = distanceFilter === item.value;

          return (
            <li key={item.value}>
              <Button
                variant="tag"
                size="xl"
                className={`flex gap-[10px] text-sm w-[140px] md:w-[167px] lg:w-[136px] ${
                  isActive ? 'clickedBtn' : ''
                }`}
                onClick={() => setDistanceFilter(item.value as IDistanceFilter)}
                id={item.value}
              >
                {item.title}
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
