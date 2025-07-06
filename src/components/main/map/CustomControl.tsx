'use client';
import { ButtonLocation } from '@/components/main/map/ButtonLocation';
import { ButtonZoom } from '@/components/main/map/ButtonZoom';
import { useMap } from 'react-leaflet';

export const CustomControl = () => {
  const map = useMap();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 1000,
        display: 'flex',
        gap:'40px'
      }}
    >
      <div className=" gap-1 hidden lg:flex">
        <ButtonZoom onClickHandler={() => map.zoomIn()}>+</ButtonZoom>
        <ButtonZoom onClickHandler={() => map.zoomOut()}>-</ButtonZoom>
      </div>
      <ButtonLocation />
    </div>
  );
};
