'use client';

import { JSX } from 'react';
import { MenuCategories } from './MenuCategories';
import { AccordionData } from './AccordionData';
import { ICustomAccordionProps } from '@/types/support';
import { motion } from 'framer-motion';

export const CustomAccordion = ({
  menuCategories,
  activeCategory,
  setActiveCategory,
  categoryData,
  filteredCategories,
  isFiltering,
  openItem,
  setOpenItem,
  toggleItem,
  t,
}: ICustomAccordionProps): JSX.Element => {
  return (
    <div className="w-full mx-auto">
      {!isFiltering ? (
        <>
          <MenuCategories
            menuCategories={menuCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            setOpenItem={setOpenItem}
            t={t}
          />
          <AccordionData
            activeCategory={activeCategory}
            categoryData={categoryData}
            openItem={openItem}
            toggleItem={toggleItem}
          />
        </>
      ) : (
        <div className="w-full">
          {filteredCategories && filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.title} className="mb-8">
                <h3 className="text-lg mb-4 text-foreground">
                  {category.title}
                </h3>
                <AccordionData
                  activeCategory={activeCategory}
                  categoryData={category}
                  openItem={openItem}
                  toggleItem={toggleItem}
                />
              </div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="bg-card rounded-xl"
            >
              <div className="p-6">
                <p className="text-foreground text-lg text-center">
                  {t('noResultText')}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
