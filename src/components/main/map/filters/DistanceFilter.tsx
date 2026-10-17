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
  const { setDistanceFilter, distanceFilter, distanceUnit, setDistanceUnit } =
    useFilterStore();

  return (
    <>
      <div className="flex">
        <h4 className="text-base">{t('distance')}</h4>
        <div className="flex ml-auto gap-4">
          <button
            type="button"
            onClick={() => setDistanceUnit('mi')}
            className={`px-4 py-2 text-base rounded-lg transition-all cursor-pointer ${
              distanceUnit === 'mi'
                ? 'border border-text-gray text-black dark:text-white'
                : 'text-gray dark:white'
            }`}
          >
            mi
          </button>
          <button
            type="button"
            onClick={() => setDistanceUnit('km')}
            className={`px-4 py-2 text-base rounded-lg transition-all cursor-pointer ${
              distanceUnit === 'km'
                ? 'border border-text-gray text-black dark:text-white'
                : 'text-gray dark:white'
            }`}
          >
            km
          </button>
        </div>
      </div>
      <LineDivider className="flex w-full mb-4 bg-text-gray h-[1px]" />
      <ul className="flex gap-2 flex-wrap mb-[80px] w-[315px] md:w-[608px] lg:w-[393px]">
        {getDistancesList(t, distanceUnit).map((item) => {
          const isActive = distanceFilter === item.value;

          return (
            <li key={item.value}>
              <Button
                variant="tag"
                size="xl"
                className={`flex gap-[10px] text-sm w-full p-4 text-white ${
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
