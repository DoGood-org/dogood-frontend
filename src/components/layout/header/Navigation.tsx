'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { NavItem } from '@/types';
import { NavItemRenderer } from '@/components';

export const Navigation: React.FC = () => {
  const t = useTranslations('header');
  const navList = t.raw('nav') as NavItem[];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number): void => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <nav className="hidden lg:flex text-white relative z-[9998] gap-10 items-center">
      <ul className="flex gap-4 pl-10 text-base items-center">
        {navList.map((navItem, index) => (
          <NavItemRenderer
            variant="desktop"
            key={`${index}-${navItem.title}`}
            navItem={navItem}
            isActive={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </ul>
    </nav>
  );
};
