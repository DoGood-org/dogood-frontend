'use client';
import { JSX, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { IDistanceFilter } from '@/types/filter.type';

const distanceToZoomMap: Record<Exclude<IDistanceFilter, null>, number> = {
  '1': 15,
  '3': 14,
  '5': 13,
  '10': 12,
  '20': 11,
  '50': 10,
};
export const AutoZoomOnDistanceFilter = (): JSX.Element | null => {
  const map = useMap();
  const distanceFilter = useFilterStore((state) => state.distanceFilter);

  useEffect(() => {
    if (!distanceFilter) return;

    const zoom =
      distanceToZoomMap[distanceFilter as keyof typeof distanceToZoomMap];
    if (zoom !== undefined) {
      map.setZoom(zoom);
    }
  }, [distanceFilter, map]);

  return null;
};
