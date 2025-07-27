'use client';

import { ButtonMap } from '@/components/main/map/ButtonMap';
import { Minus, Plus } from 'lucide-react';
import { JSX } from 'react';
import { useMap } from 'react-leaflet';

export const ProfileCustomControlZoom = (): JSX.Element => {
  const map = useMap();

  const handleZoomIn = (): void => {
    if (map) {
      map.zoomIn();
    }
  };

  const handleZoomOut = (): void => {
    if (map) {
      map.zoomOut();
    }
  };
  return (
    <div
      className=" gap-1 flex"
      style={{
        position: 'relative',
      }}
    >
      <ButtonMap onClickHandler={handleZoomIn}>
        <Plus />
      </ButtonMap>
      <ButtonMap onClickHandler={handleZoomOut}>
        <Minus />
      </ButtonMap>
    </div>
  );
};
