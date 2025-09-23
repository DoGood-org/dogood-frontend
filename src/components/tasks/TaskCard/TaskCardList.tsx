'use client';

import { ImagePlaceholder } from './ImagePlaceholder';
import { TaskCardItem } from './TaskCardItem';
import React from 'react';

export const TaskCardList: React.FC = () => {
  return (
    <div>
      <ImagePlaceholder />
      <ul>
        <TaskCardItem />
      </ul>
    </div>
  );
};
