'use client';
import { MarkerCategoryEnum } from '@/types/mapType';
import { LatLngLiteral } from 'leaflet';
import { JSX } from 'react';

type Props = {
  clickedCoords: LatLngLiteral;
  addMarker: (marker: LatLngLiteral & { category: MarkerCategoryEnum }) => void;
  setUserLocation: (location: LatLngLiteral) => void;
  closeOptionsMenu: () => void;
};
export const PopUpContent = (props: Props): JSX.Element => {
  const { clickedCoords, addMarker, setUserLocation, closeOptionsMenu } = props;
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => {
          addMarker({
            ...clickedCoords,
            category: MarkerCategoryEnum.MyPin,
          });
          closeOptionsMenu();
        }}
      >
        ➕ Add Marker
      </button>
      <button
        onClick={() => {
          setUserLocation(clickedCoords);
          closeOptionsMenu();
        }}
      >
        📍 Set My Location
      </button>
    </div>
  );
};
