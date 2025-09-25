'use client';

import { ITaskDetails } from '@/types/tasks.type';

interface TaskDetailsProps {
  task: ITaskDetails;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  return (
    <section>
      <h2>{task.title}</h2>
      <h3>Details:</h3>
      <div></div>
    </section>
  );
};
