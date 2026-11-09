'use client';
import { JSX, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { IDistanceFilter } from '@/types/filter.type';
import { useMapStore } from '@/zustand/stores/mapStore';

const distanceToZoomMap: Record<Exclude<IDistanceFilter, null>, number> = {
  '1': 15,
  '3': 14,
  '5': 13,
  '10': 12,
  '30': 10,
  all: 10,
};
export const AutoZoomOnDistanceFilter = (): JSX.Element | null => {
  const map = useMap();
  const distanceFilter = useFilterStore((state) => state.distanceFilter);
  const prevFilter = useRef(distanceFilter);

  useEffect(() => {
    if (prevFilter.current === distanceFilter) return;
    prevFilter.current = distanceFilter;

    if (!distanceFilter) return;
    if (useMapStore.getState().pendingFlyTo) return;

    const zoom =
      distanceToZoomMap[distanceFilter as keyof typeof distanceToZoomMap];

    if (zoom !== undefined && map.getZoom() !== zoom) {
      map.setZoom(zoom, { animate: false });
    }
  }, [distanceFilter, map]);

  return null;
};
