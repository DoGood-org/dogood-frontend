'use client';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX, useEffect } from 'react';
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
  const setRadius = useMapStore((s) => s.setRadius);

  useEffect(() => {
    const r = zoomToRadiusMap[map.getZoom()];
    if (r != null) setRadius(r);
  }, [map, setRadius]);

  useMapEvent('zoomend', () => {
    const newRadius = zoomToRadiusMap[map.getZoom()];
    if (newRadius == null) return;
    setRadius(newRadius);
  });

  return null;
};
