'use client';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import React from 'react';

export const DistanceFilter: React.FC = () => {
  const t = useTranslations('map');

  const distances = [
    { title: t('1km') },
    { title: t('3km') },
    { title: t('5km') },
    { title: t('10km') },
    { title: t('neutroBtn') },
  ];

  return (
    <ul className="flex gap-[10px] flex-wrap w-full mb-[95px]">
      {distances.map((distance, index) => (
        <li key={index}>
          <Button variant="filters" className="flex gap-[10px]">
            {distance.title}
          </Button>
        </li>
      ))}
    </ul>
  );
};
