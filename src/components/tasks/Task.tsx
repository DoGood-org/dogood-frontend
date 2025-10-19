'use client';

import { ITaskDetails } from '@/types/tasks.type';
import { TaskCard } from '@/components';
import { TaskDetails } from '@/components';

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
