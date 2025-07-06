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
      className="z-150 w-11 h-11 flex items-center justify-center rounded-sm bg-[var(--map-btn-bg)] cursor-pointer border-[var(--map-btn-border)]"
    >
      <span className="text-[var(--map-btn-icon)]">
        <GpsIcon className=" w-6 h-6 " />
      </span>
    </button>
  );
};
