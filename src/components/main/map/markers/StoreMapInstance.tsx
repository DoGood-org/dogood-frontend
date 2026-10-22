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
  useEffect(() => {
    setMapInstance(mapKey, map);

    return (): void => {
      useMapStore.setState((state) => {
        if (state.mapInstances[mapKey] !== map) {
          return state;
        }

        return {
          mapInstances: {
            ...state.mapInstances,
            [mapKey]: null,
          },
        };
      });
    };
  }, [map, mapKey, setMapInstance]);

  return null;
};

export { StoreMapInstance };
