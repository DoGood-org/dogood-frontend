'use client';

import { JSX } from 'react';
import { TaskCategoryItem } from './TaskCategoryItem';
import { CATEGORIES } from '@/constants/createTask.categories';
import { TaskCategoryEnum } from '@/types/createTask.type';

interface TaskCategoryListProps {
  categories?: TaskCategoryEnum[];
}

export const TaskCategoryList = ({
  categories = [],
}: TaskCategoryListProps): JSX.Element => {
  const selectedCategories = CATEGORIES.filter((cat) =>
    categories.includes(cat.id as TaskCategoryEnum)
  );

  return (
    <ul>
      <div className="flex gap-4">
        {selectedCategories.map((cat) => (
          <TaskCategoryItem
            key={cat.id}
            icon={cat.icon}
            colorClass={cat.colorClass}
          />
        ))}
      </div>
    </ul>
  );
};
