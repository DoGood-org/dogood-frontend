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
    icon: <Medicine className="stroke-black" />,
    color: 'bg-[#FFC3C3]',
  },
  Animal: {
    icon: <Animal className="stroke-black" />,
    color: 'bg-[#D2EDFF]',
  },
  Nature: {
    icon: <Nature className="stroke-black" />,
    color: 'bg-[#FF7D57]',
  },
  Food: {
    icon: <Food className="stroke-black" />,
    color: 'bg-[#FF7D57]',
  },
};
export const TaskItem: FC<ExtendedITasksProps> = ({
  title,
  subtitle,
  category,
  isSelected,
  onToggleDescription,
}) => {
  const t = useTranslations('map');

  return (
    <div className="min-h-[200px]">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <h4 className="mb-4">{subtitle}</h4>
      <CategoryIconsList
        categories={category}
        getCategoryIcon={getCategoryIcon}
      />
      <div className="flex justify-between mb-8">
        <Button variant="primary" size="md" className="text-[14px]">
          {t('respondBtn')}
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onToggleDescription}
          className={`bg-card text-[14px] ${isSelected ? 'clickedBtn' : ''}`}
        >
          {t('descriptionBtn')}
        </Button>
      </div>
      <div className="w-full bg-[#999999] h-[1px] mb-8" />
    </div>
  );
};
