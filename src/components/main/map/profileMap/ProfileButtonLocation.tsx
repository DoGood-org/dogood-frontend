'use client';
import { GpsIcon } from '@/components/icons/GPSicon';
import { ButtonMap } from '@/components/main/map/controls/ButtonMap';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

export const ProfileButtonLocation = (): JSX.Element => {
  const locateMe = useMapStore((state) => state.locateMe);
  return (
    <ButtonMap onClickHandler={() => locateMe('user')}>
      <GpsIcon className=" w-6 h-6" />
    </ButtonMap>
  );
};
