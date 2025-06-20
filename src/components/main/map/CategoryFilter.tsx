'use client';
import React, { FC } from 'react';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { getCategoryList } from '@/lib/utils';
import { CategoryFilterProps } from '@/types/mapType';

export const CategoryFilter: FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategoryToggle,
}) => {
  const t = useTranslations('map');

  const CATEGOTY_LIST = getCategoryList(t);
  return (
    <div className="mb-9">
      <h4 className="text-base">{t('category')}</h4>
      <div className="w-full bg-[#999999] h-[1px] mb-4" />

      <ul className="flex gap-[10px] flex-wrap w-full mb-6">
        {CATEGOTY_LIST.map((category, index) => (
          <li key={index}>
            <Button
              variant="tag"
              size="xl"
              className={`flex gap-[10px]${
                selectedCategories.includes(category.title) ? 'clickedBtn' : ''
              }`}
              onClick={() => onCategoryToggle(category.title)}
              id={category.title}
            >
              <category.icon className="fill-foreground" />
              {category.title}
            </Button>
          </li>
        ))}
        <li>
          <Button
            variant="tag"
            size="xl"
            className={`flex gap-[10px]${
              selectedCategories.includes('Doesn\"t matter') ? 'clickedBtn' : ''
            }`}
            onClick={() => onCategoryToggle('Doesn\"t matter')}
            id="Does'n matter"
          >
            {t('neutroBtn')}
          </Button>
        </li>
      </ul>
    </div>
  );
};
