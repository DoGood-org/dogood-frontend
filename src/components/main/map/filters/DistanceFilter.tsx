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
  const list = getDistancesList(t, distanceUnit);
  return (
    <>
      <div className="flex">
        <h4 className="text-base">{t('distance')}</h4>
        <div className="flex ml-auto gap-4 mb-1">
          {(['mi', 'km'] as const).map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => setDistanceUnit(unit)}
              className={`px-4 py-2 text-base rounded-lg border transition-all cursor-pointer ${
                distanceUnit === unit
                  ? 'border-text-gray text-black dark:text-white'
                  : 'border-transparent text-text-gray dark:text-white'
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>
      <LineDivider className="flex w-full mb-4 bg-text-gray h-[1px]" />
      <ul className="grid grid-cols-3 gap-2 mb-[80px] w-[315px] max-w-full md:w-[608px] md:grid-cols-5 lg:w-[393px] lg:grid-cols-3">
        {list.map((item, index) => {
          const isActive = distanceFilter === item.value;
          const isLast = index === list.length - 1;

          return (
            <li key={item.value} className={isLast ? 'col-span-2' : ''}>
              <Button
                variant="tag"
                size="xl"
                className={`flex gap-[10px] text-sm w-full p-4 text-white max-w-[136px] ${
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
