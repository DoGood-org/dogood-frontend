'use client';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';

export const RadiusWatcher = (): JSX.Element | null => {
  const map = useMap();
  const { setRadius } = useMapStore();

  const zoomToRadiusMap: Record<number, number> = {
    18: 100,
    17: 250,
    16: 500,
    15: 1000,
    14: 2000,
    13: 3000,
    12: 5000,
    11: 8000,
    10: 12000,
  };

  useMapEvent('zoomend', () => {
    const zoom = map.getZoom();
    const newRadius = zoomToRadiusMap[zoom] || 0;
    setRadius(newRadius);
  });

  return null;
};
