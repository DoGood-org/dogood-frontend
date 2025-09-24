'use client';

import { ITaskDetails } from '@/types/tasks.type';
import { TaskCard } from './TaskCard';

interface TaskProps {
  task: ITaskDetails;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  return <TaskCard task={task} />;
};
