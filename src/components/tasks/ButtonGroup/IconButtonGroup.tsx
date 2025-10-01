'use client';

import { TaskCategoryIconsList } from '@/components/main/map/tasksPanel/TaskCategoryIconList';
import { FavoriteToggleButton } from '@/components/tasks/ButtonGroup/FavoriteToggleButton';
import { MapDotButton } from '@/components/tasks/ButtonGroup/MapDotButton';
import { MarkerCategoryEnum } from '@/types';
import { useEffect, useState } from 'react';

interface IconButtonGroupProps {
  categories: MarkerCategoryEnum[];
  distance: string;
}

export const IconButtonGroup: React.FC<IconButtonGroupProps> = ({
  categories,
  distance,
}) => {
  const [clientDistance, setClientDistance] = useState<string | null>(null);

  useEffect(() => {
    setClientDistance(distance);
  }, [distance]);
  return (
    <div className="relative flex items-center justify-between py-5">
      <span className="absolute top-0 left-0 h-px w-full bg-text-gray"></span>
      <TaskCategoryIconsList categories={categories} />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <FavoriteToggleButton />
          <MapDotButton />
        </div>
        <span>{clientDistance ?? '-- km'}</span>
      </div>
    </div>
  );
};
