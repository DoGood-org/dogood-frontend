'use client';

import { ITaskDetails } from '@/types/tasks.type';
import { TaskCard } from '@/components';
import { TaskDetails } from '@/components';

interface TaskProps {
  task: ITaskDetails;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <section>
      <TaskCard task={task} />
      <TaskDetails task={task} />
    </section>
  );
};
