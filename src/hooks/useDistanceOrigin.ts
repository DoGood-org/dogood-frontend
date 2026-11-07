import { useMapStore } from '@/zustand/stores/mapStore';
import { LatLngLiteral } from 'leaflet';

export const useDistanceOrigin = (): LatLngLiteral =>
  useMapStore((s) => s.userLocation ?? s.defaultLocation);
