'use client';

import { ITaskDetails } from '@/types/tasks.type';
import { TaskCard } from './TaskCard';
import { TaskDetails } from './TaskDetails';

interface TaskProps {
  task: ITaskDetails;
  showEditButton?: boolean;
}

export const Task: React.FC<TaskProps> = ({ task, showEditButton = true }) => {
  if (!task) return null;
  return (
    <section className="lg:flex gap-20">
      <TaskCard task={task} />
      <TaskDetails task={task} showEditButton={showEditButton} />
    </section>
  );
};
