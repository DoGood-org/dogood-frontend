'use client';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';

export const zoomToRadiusMap: Record<number, number> = {
  15: 1000,
  14: 3000,
  13: 5000,
  12: 10000,
  11: 20000,
  10: 50000,
};

export const RadiusWatcher = (): JSX.Element | null => {
  const map = useMap();
  const { setRadius } = useMapStore();

  useMapEvent('zoomend', () => {
    const zoom = map.getZoom();
    const newRadius = zoomToRadiusMap[zoom] || 0;
    setRadius(newRadius);
  });

  return null;
};
