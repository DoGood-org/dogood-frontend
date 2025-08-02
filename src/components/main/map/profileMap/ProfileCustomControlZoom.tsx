'use client';

import { SvgPlus } from '@/components/icons/Plus';
import { SvgMinus } from '@/components/icons/SvgMinus';
import { ButtonMap } from '@/components/main/map/ButtonMap';
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
        <SvgPlus />
      </ButtonMap>
      <ButtonMap onClickHandler={handleZoomOut}>
        <SvgMinus />
      </ButtonMap>
    </div>
  );
};
