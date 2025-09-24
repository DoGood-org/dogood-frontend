'use client';

import React from 'react';
import { ITaskDetails } from '@/types/tasks.type';
import { ImagePlaceholder } from './ImagePlaceholder';

interface TaskCardProps {
  task: ITaskDetails;
}

export const TaskCard: React.FC<TaskCardProps> = () => {
  return (
    <div>
      <ImagePlaceholder />
      <div></div>
    </div>
  );
};
