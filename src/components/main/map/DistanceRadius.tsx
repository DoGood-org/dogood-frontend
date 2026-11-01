'use client';

import { Circle } from 'react-leaflet';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

export const DistanceRadius = (): JSX.Element | null => {
  const distanceFilter = useFilterStore((s) => s.distanceFilter);
  const distanceUnit = useFilterStore((s) => s.distanceUnit);
  const userLocation = useMapStore((s) => s.userLocation);

  if (!userLocation || !distanceFilter || distanceFilter === 'all') {
    return null;
  }

  const radius =
    Number(distanceFilter) * (distanceUnit === 'mi' ? 1609.34 : 1000);

  return (
    <Circle
      center={userLocation}
      radius={radius}
      pathOptions={{
        color: '#4A90E2',
        weight: 2,
        fillColor: '#4A90E2',
        fillOpacity: 0.12,
      }}
    />
  );
};
