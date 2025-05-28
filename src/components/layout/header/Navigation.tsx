'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { NavItem } from '@/types';
import { NavItemRenderer } from './NavItemRenderer';

export const Navigation: React.FC = () => {
  const t = useTranslations('header');
  const navList = t.raw('nav') as NavItem[];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number): void => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <nav className="text-white relative z-100">
      <ul className="flex gap-10 pl-10">
        {navList.map((navItem, index) => (
          <NavItemRenderer
            key={navItem.title}
            navItem={navItem}
            isOpen={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </ul>
    </nav>
  );
};
