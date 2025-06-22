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
          <button
            className={`${getCategoryIcon(item).color} w-[50px] h-[50px] flex justify-center items-center rounded-full`}
          >
            <span
              style={{
                width: '24px',
                height: '24px',
                stroke: '#000000',
                fill: '#000000',
              }}
            >
              {getCategoryIcon(item).icon}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryIconsList;
