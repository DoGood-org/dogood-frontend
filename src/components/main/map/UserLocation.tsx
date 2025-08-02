'use client';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const UserLocation: React.FC = () => {
  const map = useMap();
  const userLocation = useMapStore((store) => store.userLocation);

  useEffect(() => {
    if (!map || !userLocation) return;

    map.flyTo(userLocation, map.getZoom(), {
      animate: true,
      duration: 1.5,
      easeLinearity: 0.5,
    });
  }, [userLocation, map]);

  return null;
};
