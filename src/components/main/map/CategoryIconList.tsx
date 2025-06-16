import { CategoryIconsListProps } from '@/types/mapType';
import React from 'react';

const CategoryIconsList: React.FC<CategoryIconsListProps> = ({
  categories,
  getCategoryIcon,
}) => {
  return (
    <ul className="flex gap-4 mb-6">
      {categories.map((item: any, idx: React.Key | null | undefined) => (
        <li key={idx}>
          <button className={`${getCategoryIcon(item).color} rounded-full p-2`}>
            {getCategoryIcon(item).icon}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryIconsList;
