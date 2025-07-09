'use client';

import { ButtonZoom } from '@/components/main/map/ButtonZoom';
import { Minus, Plus } from 'lucide-react';
import { JSX } from 'react';
import { useMap } from 'react-leaflet';

export const CustomControlZoom = (): JSX.Element => {
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
      className=" gap-1 hidden lg:flex z-[5001] "
      style={{
        position: 'relative',
      }}
    >
      <ButtonZoom onClickHandler={handleZoomIn}>
        <Plus />
      </ButtonZoom>
      <ButtonZoom onClickHandler={handleZoomOut}>
        <Minus />
      </ButtonZoom>
    </div>
  );
};
