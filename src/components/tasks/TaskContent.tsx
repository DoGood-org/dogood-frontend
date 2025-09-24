'use client';

import { Task } from './Task';
import { ITaskDetails } from '@/types/tasks.type';

interface TaskContentProps {
  task: ITaskDetails;
}

export const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  return <Task task={task} />;
};
