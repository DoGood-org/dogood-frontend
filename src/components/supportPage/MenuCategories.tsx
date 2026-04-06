import React from 'react';
import { Button } from '../ui/Button';
import { IMenuCategoriesProps } from '@/types/support';

export const MenuCategories = ({
  menuCategories,
  activeCategory,
  setActiveCategory,
  setOpenItem,
  t,
}: IMenuCategoriesProps): React.JSX.Element => {
  return (
    <div className="flex flex-wrap gap-1 lg:gap-4 mb-4 md:mb-10">
      {menuCategories.map((category) => (
        <Button
          variant="ghost"
          size="sm"
          key={category}
          onClick={() => {
            setActiveCategory(category);
            setOpenItem(null);
          }}
          className={`px-4 py-2 lg:text-[20px] rounded-lg text-foreground transition-colors duration-500 ${
            activeCategory === category ? 'border-border' : 'border-transparent'
          }`}
        >
          {t(`menu.${category}`)}
        </Button>
      ))}
    </div>
  );
};
