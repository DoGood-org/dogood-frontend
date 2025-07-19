'use client';
import { IMapClickHandlerProps, MapClickType } from '@/types/mapType';
import { LatLngLiteral } from 'leaflet';
import { useMapEvents } from 'react-leaflet';

export const MapClickHandler: React.FC<IMapClickHandlerProps> = ({
  onClick,
  allowClickToAddMarker,
  setShowOptionsMenu,
  setClickedCoords,
}) => {
  useMapEvents({
    contextmenu: (event) => {
      if (!allowClickToAddMarker) return;

      const coords = event.latlng as LatLngLiteral;
      setClickedCoords?.(coords);
      setShowOptionsMenu?.(true);
      onClick(coords, 'right');
    },
    dblclick: (event) => {
      if (!allowClickToAddMarker) return;

      const coords = event.latlng as LatLngLiteral;
      onClick(coords, 'double');
    },
  });

  return null;
};
