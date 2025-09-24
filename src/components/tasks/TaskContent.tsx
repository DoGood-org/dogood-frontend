'use client';

import { Task } from './Task';

interface TaskContentProps {
  slug: string;
}

export const TaskContent: React.FC<TaskContentProps> = () => {
  return <Task />;
};
