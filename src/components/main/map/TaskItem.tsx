'use client';
import { Animal, Food, Medicine, Nature } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { createBackgroundColor } from '@/lib/utils';
import { ExtendedITasksProps } from '@/types/mapType';
import { useTranslations } from 'next-intl';
import React, { FC, JSX } from 'react';

export const TaskItem: FC<ExtendedITasksProps> = ({
  title,
  subtitle,
  category,
  isSelected,
  onToggleDescription,
}) => {
  const t = useTranslations('map');

  const createImg = (title: string): JSX.Element | undefined => {
    switch (title) {
      case 'Medicine':
        return <Medicine className="stroke-black" />;
      case 'Nature':
        return <Nature className="stroke-black" />;
      case 'Animal':
        return <Animal className="stroke-black" />;
      case 'Food':
        return <Food className="stroke-black" />;
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-[200px]">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <h4 className="mb-4">{subtitle}</h4>
      <ul className="flex gap-4 list-none mb-6">
        {category.map((item, idx) => (
          <li key={idx}>
            <button
              className={`${createBackgroundColor(item)} rounded-full p-2`}
            >
              {createImg(item)}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mb-8">
        <Button variant="primary" size="md" className="text-[14px]">
          {t('respondBtn')}
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onToggleDescription}
          className={`flex gap-[10px] bg-card ${
            isSelected ? 'clickedBtn' : ''
          }`}
        >
          {t('descriptionBtn')}
        </Button>
      </div>
      <div className="w-full bg-[#999999] h-[1px] mb-8" />
    </div>
  );
};
