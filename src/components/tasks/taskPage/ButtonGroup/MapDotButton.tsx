'use client';

import { GoToTask } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useShowOnMap } from '@/hooks/useShowOnMap';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { LatLngLiteral } from 'leaflet';
import { useMemo, useState } from 'react';
import { TaskMapModal } from '../TaskMapModal';

interface MapDotButtonProps {
  lat?: number;
  lng?: number;
  taskId: string;
  onAfterClick?: () => void;
  redirectToMap?: boolean;
  title?: string;
  isPreview?: boolean;
}

export const MapDotButton: React.FC<MapDotButtonProps> = ({
  lat,
  lng,
  taskId,
  onAfterClick,
  redirectToMap = false,
  isPreview = false,
  title = '',
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const flyToCoords = useMapStore((s) => s.flyToCoords);
  const setHighlightedTaskId = useTaskStore((s) => s.setHighlightedTaskId);
  const showOnMap = useShowOnMap(
    taskId,
    lat != null && lng != null ? { lat, lng } : undefined
  );

  const coords = useMemo<LatLngLiteral | null>(
    () => (lat != null && lng != null ? { lat, lng } : null),
    [lat, lng]
  );

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();

    if (isPreview) {
      setIsMapOpen(true);
      onAfterClick?.();
      return;
    }

    if (redirectToMap) {
      showOnMap();
    } else {
      if (lat != null && lng != null) {
        flyToCoords({ lat, lng }, 17, 'main');
      }
      setHighlightedTaskId(taskId);
    }
    onAfterClick?.();
  };

  return (
    <>
      <Button variant="iconOnly" size="icon" onClick={handleClick}>
        <GoToTask className="text-[#00c1ac] size-6" />
      </Button>

      {isPreview && isMapOpen && coords && (
        <TaskMapModal
          coords={coords}
          title={title}
          onClose={() => setIsMapOpen(false)}
        />
      )}
    </>
  );
};
