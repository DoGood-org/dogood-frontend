'use client';

import { SvgPlus } from '@/components/icons/Plus';
import { SvgMinus } from '@/components/icons/SvgMinus';
import { ButtonMap } from '@/components/main/map/ButtonMap';
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
      className=" gap-1 hidden lg:flex"
      style={{
        position: 'relative',
      }}
    >
      <ButtonMap onClickHandler={handleZoomIn}>
        <SvgPlus className="w-6 h-6 text-[var(--map-btn-icon)]" />
      </ButtonMap>
      <ButtonMap onClickHandler={handleZoomOut}>
        <SvgMinus className="w-6 h-6 text-[var(--map-btn-icon)]" />
      </ButtonMap>
    </div>
  );
};
