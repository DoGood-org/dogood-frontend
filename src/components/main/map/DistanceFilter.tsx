'use client';
import { Button } from '@/components/ui/Button';
import { getDistancesList } from '@/lib/utils';
import { DistanceFilterProps } from '@/types/mapType';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

export const DistanceFilter: FC<DistanceFilterProps> = ({
  selectedDistances,
  onDistanceToggle,
}) => {
  const t = useTranslations('map');

  const DISTANCE_LIST = getDistancesList(t);

  return (
    <>
      <h4 className="text-base">{t('distance')}</h4>
      <div className="w-full bg-[#999999] h-[1px] mb-4" />

      <ul className="flex gap-[10px] flex-wrap w-full mb-[80px]">
        {DISTANCE_LIST.map((distance, index) => (
          <li key={index}>
            <Button
              variant="tag"
              size="xl"
              className={`flex gap-[10px]${
                selectedDistances.includes(distance.title) ? 'clickedBtn' : ''
              }`}
              onClick={() => onDistanceToggle(distance.title)}
              id={distance.title}
            >
              {distance.title}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
