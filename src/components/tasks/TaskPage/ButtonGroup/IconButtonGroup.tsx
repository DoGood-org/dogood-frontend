'use client';

import { FavoriteToggleButton } from '@/components/tasks/taskPage/ButtonGroup/FavoriteToggleButton';
import { MapDotButton } from '@/components/tasks/taskPage/ButtonGroup/MapDotButton';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { useEffect, useState } from 'react';
import { TaskCategoryList } from '../../createPage/TaskCategoryList/TaskCategoryList';

interface IconButtonGroupProps {
  categories: TaskCategoryEnum[];
  location?: { lat: number; lng: number } | null;
  distance: string;
  lat?: number;
  lng?: number;
  taskId?: string;
}

export const IconButtonGroup: React.FC<IconButtonGroupProps> = ({
  distance,
  categories,
  location,
  lat,
  lng,
  taskId,
}) => {
  console.log('IconButtonGroup categories:', categories);
  const [clientDistance, setClientDistance] = useState<string | null>(null);

  useEffect(() => {
    setClientDistance(distance);
  }, [distance]);

  return (
    <div className="relative flex items-center justify-between py-2 md:py-5">
      <span className="absolute top-0 left-0 h-px w-full bg-text-gray"></span>
      <TaskCategoryList categories={categories} />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          {taskId && (
            <>
              <FavoriteToggleButton taskId={taskId} />
              {lat !== undefined && lng !== undefined && (
                <MapDotButton lat={lat} lng={lng} taskId={taskId} />
              )}
            </>
          )}
        </div>
        <span>{clientDistance ?? '-- km'}</span>
        {location ? `${location.lat}, ${location.lng}` : '-- km'}
      </div>
    </div>
  );
};
