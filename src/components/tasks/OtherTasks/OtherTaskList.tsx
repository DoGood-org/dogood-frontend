'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { OtherTskItem } from '@/components';

interface OtherListProps {
  tasks: IExtendedITaskProps[];
}

export const OtherTaskList: React.FC<OtherListProps> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center p-6 text-gray-500">
        There are no tasks in this section yet.
      </p>
    );
  }
  return (
    <ul className="flex gap-4">
      {tasks.map((task) => (
        <OtherTskItem key={task.id} {...task} />
      ))}
    </ul>
  );
};
