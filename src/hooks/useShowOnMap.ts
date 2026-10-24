'use client';
import { useRouter } from '@/i18n/navigation';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { useCallback } from 'react';

export const useShowOnMap = (
  taskId: string,
  location?: { lat: number; lng: number }
): (() => void) => {
  const router = useRouter();
  const setPendingFlyTo = useMapStore((s) => s.setPendingFlyTo);
  const setHighlightedTaskId = useTaskStore((s) => s.setHighlightedTaskId);

  const lat = location?.lat;
  const lng = location?.lng;

  const setSkipGeoPrompt = useMapStore((s) => s.setSkipGeoPrompt);

  return useCallback(() => {
    if (lat === undefined || lng === undefined) return;
    setSkipGeoPrompt(true);
    setPendingFlyTo({ lat, lng });
    setHighlightedTaskId(taskId);
    router.push('/');
  }, [
    lat,
    lng,
    taskId,
    router,
    setPendingFlyTo,
    setHighlightedTaskId,
    setSkipGeoPrompt,
  ]);
};
