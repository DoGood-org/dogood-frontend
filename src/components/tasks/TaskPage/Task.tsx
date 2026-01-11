'use client';

import { ITaskDetails } from '@/types/tasks.type';
import { TaskCard } from './TaskCard';
import { TaskDetails } from './TaskDetails';

interface TaskProps {
  task: ITaskDetails;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <section className="lg:flex gap-20">
      <TaskCard task={task} />
      <TaskDetails task={task} />
    </section>
  );
};
