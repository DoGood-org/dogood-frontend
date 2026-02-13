'use client';
import React, { useState } from 'react';
import { CustomAccordion } from './CustomAccordion';
import { useTranslations } from 'next-intl';
import { MenuCategoryKey } from '@/types/support';
import { Section } from '../ui/Section';
import { Filter } from './Filter';
import {
  getAllCategoriesData,
  getFilteredCategories,
  menuCategories,
} from '@/lib/utils';

export const FAQSection = (): React.JSX.Element => {
  const t = useTranslations('support');
  const [activeCategory, setActiveCategory] =
    useState<MenuCategoryKey>('general');
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [appliedFilter, setAppliedFilter] = useState<string>('');

  const allCategoriesData = getAllCategoriesData(t);

  const filteredCategories = getFilteredCategories(
    appliedFilter,
    allCategoriesData
  );
  const isFiltering = appliedFilter.length > 0;

  const toggleItem = (itemId: string): void => {
    setOpenItem(openItem === itemId ? null : itemId);
  };
  const handleFilterChange = (filter: string): void => {
    setAppliedFilter(filter);
    setOpenItem(null);
  };

  const handleCategoryChange = (category: MenuCategoryKey): void => {
    setActiveCategory(category);
    setAppliedFilter('');
    setOpenItem(null);
  };

  return (
    <Section>
      <h2 className="text-h2-m lg:text-h2-d mb-4 md:hidden">{t('title')}</h2>
      <Filter handleFilterChange={handleFilterChange} t={t} />
      <h2 className="hidden md:block md:text-center text-h2-m lg:text-h2-d md:mb-10">
        {t('title')}
      </h2>
      <CustomAccordion
        menuCategories={menuCategories}
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
        categoryData={allCategoriesData[activeCategory]}
        filteredCategories={filteredCategories}
        isFiltering={isFiltering}
        openItem={openItem}
        setOpenItem={setOpenItem}
        toggleItem={toggleItem}
        t={t}
        appliedFilter={appliedFilter}
      />
    </Section>
  );
};
