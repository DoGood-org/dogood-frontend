'use client';
import { useRouter } from 'next/navigation';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTaskStore } from '@/zustand/stores/taskStore';

export const useShowOnMap = (
  taskId: string,
  location?: { lat: number; lng: number }
): (() => void) => {
  const router = useRouter();
  const setPendingFlyTo = useMapStore((s) => s.setPendingFlyTo);
  const setHighlightedTaskId = useTaskStore((s) => s.setHighlightedTaskId);

  return () => {
    if (!location) return;
    setPendingFlyTo(location);
    setHighlightedTaskId(taskId);
    router.push('/', { scroll: false });
  };
};
