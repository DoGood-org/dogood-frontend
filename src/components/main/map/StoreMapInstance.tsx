'use client';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type Props = {
  mapKey: 'main' | 'user';
};

const StoreMapInstance = ({ mapKey }: Props): null => {
  const map = useMap();
  const setMapInstance = useMapStore((s) => s.setMapInstance);
  const currentMapInstance = useMapStore((s) => s.mapInstances[mapKey]);

  useEffect(() => {
    if (map && map !== currentMapInstance) {
      console.log('[Zustand] Storing map instance for key:', mapKey);
      setMapInstance(mapKey, map);
    }
  }, [map, mapKey, currentMapInstance, setMapInstance]);

  return null;
};

export { StoreMapInstance };
