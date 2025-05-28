'use client';
import React from 'react';
import MedicineSvg from '@/components/icons/Medicine';
import NatureSvg from '@/components/icons/Nature';
import AnimalSvg from '@/components/icons/Animal';
import FoodSvg from '@/components/icons/Food';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

export const CategoryFilter: React.FC = () => {
  const t = useTranslations('map');

  const categories = [
    { icon: MedicineSvg, title: t('medicineBtn') },
    { icon: NatureSvg, title: t('natureBtn') },
    { icon: AnimalSvg, title: t('animalBtn') },
    { icon: FoodSvg, title: t('foodBtn') },
  ];

  return (
    <ul className="flex gap-[10px] flex-wrap w-full mb-5">
      {categories.map((category, index) => (
        <li key={index}>
          <Button variant="filters" className="flex gap-[10px]">
            <category.icon className="fill-foreground" />
            {category.title}
          </Button>
        </li>
      ))}
      <Button variant="filters">{t('neutroBtn')}</Button>
    </ul>
  );
};
