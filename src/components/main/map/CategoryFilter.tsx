import React from 'react';
import MedicineSvg from '@/components/icons/Medicine';
import NatureSvg from '@/components/icons/Nature';
import AnimalSvg from '@/components/icons/Animal';
import FoodSvg from '@/components/icons/Food';
import { Button } from '@/components/ui/Button';

const categories = [
  { icon: MedicineSvg, title: 'only medicine' },
  { icon: NatureSvg, title: 'only nature' },
  { icon: AnimalSvg, title: 'only animals' },
  { icon: FoodSvg, title: 'only food' },
];

export const CategoryFilter = () => {
  return (
    <ul className="flex gap-[10px] flex-wrap w-full">
      {categories.map((category, index) => (
        <li key={index}>
          <Button variant="filters" className="flex gap-[10px]">
            <category.icon className="fill-foreground w-[27px] h-[27px]" />
            {category.title}
          </Button>
        </li>
      ))}
    </ul>
  );
};
