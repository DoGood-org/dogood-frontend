'use client';
import { useMapEvent } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import { IMapClickHandlerProps, MapClickType } from '@/types/mapType';

export const MapClickHandler: React.FC<IMapClickHandlerProps> = ({
  onClick,
  allowClickToAddMarker,
  clickOptions,
  setClickedCoords,
  setShowOptionsMenu,
}) => {
  const handleClick = (
    latlng: LatLngLiteral,
    clickType: MapClickType
  ): void => {
    if (!allowClickToAddMarker) return;

    onClick(latlng, clickType);
    // clickOptions?.setMe?.(latlng);
    // clickOptions?.setMyMarker?.(latlng);
    // setClickedCoords?.(latlng);
    setShowOptionsMenu?.(true);

    console.log(`${clickType} click on map`, latlng);
  };

  useMapEvent('click', (e) => handleClick(e.latlng, 'left'));
  useMapEvent('contextmenu', (e) => handleClick(e.latlng, 'right'));

  return null;
};
