'use client';

import { JSX } from 'react';
import { TaskCategoryItem } from './TaskCategoryItem';
import { CATEGORIES } from '@/constants/createTask.categories';
import { TaskCategoryEnum } from '@/types/createTask.type';

interface TaskCategoryListProps {
  categories?: TaskCategoryEnum[];
  hideDonation?: boolean;
}

export const TaskCategoryList = ({
  categories = [],
  hideDonation = false,
}: TaskCategoryListProps): JSX.Element => {
  const filteredCategories = hideDonation
    ? categories.filter((cat) => cat !== TaskCategoryEnum.Donation)
    : categories;

  const selectedCategories = CATEGORIES.filter((cat) =>
    filteredCategories.includes(cat.id as TaskCategoryEnum)
  );
  return (
    <ul>
      <div className="flex gap-4">
        {selectedCategories.map((cat) => (
          <TaskCategoryItem
            key={cat.id}
            icon={cat.icon}
            colorClass={cat.colorClass}
            withWhiteCircle={cat.withWhiteCircle}
          />
        ))}
      </div>
    </ul>
  );
};
