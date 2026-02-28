import { useMapStore } from '@/zustand/stores/mapStore';
import { getDistanceStr } from '@/utils/taskTransform';
import { useMemo } from 'react';

interface Location {
  lat?: number;
  lng?: number;
}

/**
 * @param taskLocation
 * @param fallbackDistance
 */
export const useTaskDistance = (
  taskLocation?: Location | null,
  fallbackDistance?: string
): string | null => {
  const userLocation = useMapStore((s) => s.userLocation);

  const distance = useMemo(() => {
    const targetLat = taskLocation?.lat;
    const targetLng = taskLocation?.lng;
    const userLat = userLocation?.lat;
    const userLng = userLocation?.lng;

    if (
      typeof targetLat === 'number' &&
      typeof targetLng === 'number' &&
      typeof userLat === 'number' &&
      typeof userLng === 'number' &&
      targetLat !== 0 &&
      targetLng !== 0
    ) {
      try {
        return getDistanceStr(userLat, userLng, targetLat, targetLng);
      } catch (error) {
        console.error('Distance calculation error:', error);
        return fallbackDistance || null;
      }
    }

    return fallbackDistance || null;
  }, [
    taskLocation?.lat,
    taskLocation?.lng,
    userLocation?.lat,
    userLocation?.lng,
    fallbackDistance,
  ]);

  return distance;
};
