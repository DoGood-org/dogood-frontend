import { CategoryIconsListProps } from '@/types/mapType';
import React from 'react';

const CategoryIconsList: React.FC<CategoryIconsListProps> = ({
  categories,
  getCategoryIcon,
}) => {
  return (
    <ul className="flex gap-4">
      {categories.map((item: any, idx: React.Key | null | undefined) => (
        <li key={idx}>
          <button className="bg-bg-icon w-[50px] h-[50px] flex justify-center items-center rounded-full">
            {getCategoryIcon(item).icon}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryIconsList;
