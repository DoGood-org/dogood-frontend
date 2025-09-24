'use client';

import { ITask } from '@/types/tasks.type';
import { ImagePlaceholder } from './ImagePlaceholder';
import { TaskCardItem } from './TaskCardItem';
import React from 'react';

interface ITaskCardListProps {
  tasks: ITask[];
}

export const TaskCardList: React.FC<ITaskCardListProps> = ({ tasks }) => {
  return (
    <div>
      <ImagePlaceholder />
      <ul>
        {tasks.map((task) => (
          <TaskCardItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};
