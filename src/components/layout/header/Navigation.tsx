'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { NavItem } from '@/types';
import { NavItemRenderer } from './NavItemRenderer';
import { NavButtons } from './NavButtons';

export const Navigation: React.FC = () => {
  const t = useTranslations('header');
  const navList = t.raw('nav') as NavItem[];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number): void => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <nav className="hidden md:flex text-white relative z-[9998] gap-10 items-center">
      <ul className="flex gap-10 pl-10 text-h4-d">
        {navList.map((navItem, index) => (
          <NavItemRenderer
            key={`${index}-${navItem.title}`}
            navItem={navItem}
            isOpen={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </ul>
      <NavButtons />
    </nav>
  );
};
