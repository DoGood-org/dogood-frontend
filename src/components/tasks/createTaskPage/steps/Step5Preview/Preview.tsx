'use client';

import { JSX } from 'react';
import { Task } from '@/components/tasks/taskPage/Task';
import { ITaskDetails } from '@/types/tasks.type';

interface PreviewProps {
  task: ITaskDetails;
}

export const Preview = ({ task }: PreviewProps): JSX.Element | null => {
  if (!task) return null;
  return <Task task={task} />;
};
