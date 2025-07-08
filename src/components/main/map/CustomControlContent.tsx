'use client';
import { ButtonLocation } from '@/components/main/map/ButtonLocation';
import { ButtonZoom } from '@/components/main/map/ButtonZoom';
import { JSX } from 'react';
import { useMap } from 'react-leaflet';

export const CustomControlContent = (): JSX.Element => {
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
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        bottom: '10px',
        right: '10px',
        display: 'flex',
        gap: '40px',
      }}
    >
      <div className=" gap-1 hidden lg:flex z-[5001]">
        <ButtonZoom onClickHandler={handleZoomIn}>+</ButtonZoom>
        <ButtonZoom onClickHandler={handleZoomOut}>-</ButtonZoom>
      </div>
      <ButtonLocation />
    </div>
  );
};
