'use client';
import { IMapClickHandlerProps, MapClickType } from '@/types/mapType';
import { LatLngLiteral } from 'leaflet';
import { useMapEvent } from 'react-leaflet';

export const MapClickHandler: React.FC<IMapClickHandlerProps> = ({
  onClick,
  allowClickToAddMarker,
  setShowOptionsMenu,
}) => {
  const handleClick = (
    latlng: LatLngLiteral,
    clickType: MapClickType
  ): void => {
    if (!allowClickToAddMarker) return;

    onClick(latlng, clickType);
    setShowOptionsMenu?.(true);

    console.log(`${clickType} click on map`, latlng);
  };

  useMapEvent('click', (e) => handleClick(e.latlng, 'left'));
  useMapEvent('contextmenu', (e) => handleClick(e.latlng, 'right'));

  return null;
};
