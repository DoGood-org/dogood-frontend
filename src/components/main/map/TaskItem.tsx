'use client';
import { Animal, Food, Medicine, Nature } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { getCategoryIcon } from '@/lib/utils';
import { ExtendedITasksProps, IconMap } from '@/types/mapType';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import CategoryIconsList from './CategoryIconList';

export const iconMap: IconMap = {
  Medicine: {
    icon: <Medicine className="fill-icon-color stroke-icon-color" />,
    color: 'bg-[#FFC3C3]',
  },
  Animal: {
    icon: <Animal className="fill-icon-color stroke-icon-color" />,
    color: 'bg-[#D2EDFF]',
  },
  Nature: {
    icon: <Nature className="fill-icon-color stroke-icon-color" />,
    color: 'bg-[#FF7D57]',
  },
  Food: {
    icon: <Food className="fill-icon-color stroke-icon-color" />,
    color: 'bg-[#FF7D57]',
  },
};
export const TaskItem: FC<ExtendedITasksProps> = ({
  title,
  subtitle,
  category,
  isSelected,
  distance,
  onToggleDescription,
}) => {
  const t = useTranslations('map');

  return (
    <div className="min-h-[200px]">
      <h3 className="text-base underline lg:text-xl font-semibold mb-3">
        {title}
      </h3>
      <h4 className="mb-5 md:mb-3 lg:mb-5">{subtitle}</h4>
      <div className="flex justify-between items-center mb-5 md:mb-3 lg:mb-5">
        <CategoryIconsList
          categories={category}
          getCategoryIcon={getCategoryIcon}
        />
        {distance}
      </div>
      <div className="flex justify-between mb-6">
        <Button variant="primary" size="lg" className="text-[14px] w-[156px]">
          {t('donateBtn')}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={onToggleDescription}
          className={`bg-card text-[14px] w-[82px] px-3 ${isSelected ? 'clickedBtn' : ''}`}
        >
          {t('joinBtn')}
        </Button>
      </div>
      <div className="w-full bg-[#999999] h-[1px]" />
    </div>
  );
};
