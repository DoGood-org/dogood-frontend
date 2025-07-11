import { GpsIcon } from '@/components/icons/GPSicon';
import { ButtonMap } from '@/components/main/map/ButtonMap';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

export const ButtonLocation = (): JSX.Element => {
  const { checkLocationPermission } = useMapStore();

  const handleClick = (): void => {
    checkLocationPermission();
  };

  return (
    <ButtonMap onClickHandler={handleClick}>
      <GpsIcon className=" w-6 h-6" />
    </ButtonMap>
  );
};
