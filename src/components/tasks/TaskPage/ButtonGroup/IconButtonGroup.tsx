'use client';

import { FavoriteToggleButton } from '@/components/tasks/taskPage/ButtonGroup/FavoriteToggleButton';
import { MapDotButton } from '@/components/tasks/taskPage/ButtonGroup/MapDotButton';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { TaskCategoryList } from '@/components/tasks/createTaskPage/TaskCategoryList/TaskCategoryList';
import { getDistanceStr } from '@/utils/taskTransform';
import { useMapStore } from '@/zustand/stores/mapStore';

interface IconButtonGroupProps {
  categories: TaskCategoryEnum[];
  location?: { lat: number; lng: number } | null;
  taskId?: string;
  distance?: string;
}

export const IconButtonGroup: React.FC<IconButtonGroupProps> = ({
  categories,
  location,
  taskId,
  distance: fallbackDistance,
}) => {
  const userLocation = useMapStore((state) => state.userLocation);
  const defaultLocation = useMapStore((state) => state.defaultLocation);

  const lat = location?.lat;
  const lng = location?.lng;

  const currentLat = userLocation?.lat ?? defaultLocation.lat;
  const currentLng = userLocation?.lng ?? defaultLocation.lng;
  const distanceStr =
    lat != null && lng != null
      ? getDistanceStr(currentLat, currentLng, lat, lng)
      : fallbackDistance || '-- km';

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
        <span className="text-sm text-text-gray ml-auto">
          {distanceStr || '0 km'}
        </span>
      </div>
    </div>
  );
};
