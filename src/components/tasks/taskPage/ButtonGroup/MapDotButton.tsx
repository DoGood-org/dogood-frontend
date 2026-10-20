'use client';

import { GoToTask } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTaskStore } from '@/zustand/stores/taskStore';

interface MapDotButtonProps {
  lat?: number;
  lng?: number;
  taskId: string;
  onAfterClick?: () => void;
}

export const MapDotButton: React.FC<MapDotButtonProps> = ({
  lat,
  lng,
  taskId,
  onAfterClick,
}) => {
  const flyToCoords = useMapStore((s) => s.flyToCoords);
  const setHighlightedTaskId = useTaskStore((s) => s.setHighlightedTaskId);

  const handleClick = (e: React.MouseEvent): void => {
    console.log('Fly to task:', lat, lng);
    e.stopPropagation();
    if (lat != null && lng != null) {
      flyToCoords({ lat, lng }, 17);
    }
    setHighlightedTaskId(taskId);
    onAfterClick?.();
  };

  return (
    <Button variant="iconOnly" size="icon" onClick={handleClick}>
      <GoToTask className="text-[#00c1ac] size-6" />
    </Button>
  );
};
