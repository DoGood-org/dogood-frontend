import { useEffect } from 'react';
import { useMapStore } from '@/zustand/stores/mapStore';
import { LatLngLiteral } from 'leaflet';

export const useDistanceOrigin = (): LatLngLiteral => {
  const origin = useMapStore((s) => s.userLocation ?? s.defaultLocation);
  const hasAgreedToLocation = useMapStore((s) => s.hasAgreedToLocation);
  const requestGeolocation = useMapStore((s) => s.requestGeolocation);

  useEffect(() => {
    if (hasAgreedToLocation && !useMapStore.getState().locationResolved) {
      requestGeolocation();
    }
  }, [hasAgreedToLocation, requestGeolocation]);

  return origin;
};
