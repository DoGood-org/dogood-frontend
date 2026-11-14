import { useMapStore } from '@/zustand/stores/mapStore';
import { getDistanceStr } from '@/utils/taskTransform';
import { useDistanceOrigin } from '@/hooks/useDistanceOrigin';

export const useDistanceStr = (
  location?: { lat: number; lng: number } | null,
  fallback: string = '-- km'
): string => {
  const origin = useDistanceOrigin();
  const isLocating = useMapStore(
    (s) => !!s.hasAgreedToLocation && !s.locationResolved
  );

  if (isLocating) return fallback;

  if (location?.lat != null && location?.lng != null) {
    return getDistanceStr(origin.lat, origin.lng, location.lat, location.lng);
  }

  return fallback;
};
