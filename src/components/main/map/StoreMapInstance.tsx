'use client';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const StoreMapInstance = (): null => {
  const map = useMap();
  const setMap = useMapStore((s) => s.setMap);

  useEffect(() => {
    if (map) {
      setMap(map);
    }
  }, [map, setMap]);

  return null;
};

export { StoreMapInstance };
