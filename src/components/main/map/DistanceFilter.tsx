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
      <h4 className="text-lg font-semibold mb-[13px]">{t('distance')}</h4>
      <ul className="flex gap-[10px] flex-wrap w-full mb-[95px]">
        {DISTANCE_LIST.map((distance, index) => (
          <li key={index}>
            <Button
              variant="filters"
              className={`flex gap-[10px] bg-card ${
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
