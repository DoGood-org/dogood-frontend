import { TaskCategoryLabel } from '@/components/main/map/tasksPanel/TaskCategoryLabel';
import React, { JSX } from 'react';

type Props = {
  categories: string[];
};
export const TaskCategoryIconsList = ({
  categories,
}: Props): JSX.Element | null => {
  return (
    <ul className="flex gap-4">
      {categories.map((category: string, idx: React.Key | null | undefined) => (
        <TaskCategoryLabel key={idx} category={category} />
      ))}
    </ul>
  );
};
