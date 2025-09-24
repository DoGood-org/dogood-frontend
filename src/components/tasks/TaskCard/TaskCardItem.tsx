'use client';

import { ITask } from '@/types/tasks.type';

interface ITaskCardItemProps {
  task: ITask;
}

export const TaskCardItem: React.FC<ITaskCardItemProps> = ({ task }) => {
  return (
    <li>
      <h3>{task.title}</h3>
    </li>
  );
};
