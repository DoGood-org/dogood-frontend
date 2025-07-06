import { GpsIcon } from '@/components/icons/GPSicon';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

export const ButtonLocation = (): JSX.Element => {
  const { requestGeolocation } = useMapStore();

  const onClickHandler = (): void => {
    requestGeolocation();
    console.log('Requesting geolocation...');
  };

  return (
    <button
      type="button"
      onClick={onClickHandler}
      className="w-11 h-11 mx-auto p-0 flex items-center justify-center rounded-sm bg-[var(--map-btn-bg)]"
    >
      <GpsIcon className=" w-6 h-6 text-icon-color" />
    </button>
  );
};
