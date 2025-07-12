'use client';
import { GpsIcon } from '@/components/icons/GPSicon';
import { ButtonMap } from '@/components/main/map/ButtonMap';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';
import { useMap } from 'react-leaflet';

export const ButtonLocation = (): JSX.Element => {
  const { checkLocationPermission } = useMapStore();
  const map = useMap();
  const { userLocation, setOfferPinLocation } = useMapStore();
  const handleClick = (): void => {
    checkLocationPermission();
    if (userLocation) {
      map.setZoom(16);
      map.flyTo([userLocation.lat, userLocation.lng], map.getZoom());
    } else {
      console.warn('User location is not available');
      setOfferPinLocation(true);
      setTimeout(() => {
        setOfferPinLocation(false);
      }, 10000);
    }
  };

  return (
    <ButtonMap onClickHandler={handleClick}>
      <GpsIcon className=" w-6 h-6" />
    </ButtonMap>
  );
};
