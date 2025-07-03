import GPSicon from '@/components/icons/GPSicon';
import { Button } from '@/components/ui/Button';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX } from 'react';

// ButtonLocation component to check location permission
// This component renders a button that, when clicked, checks the user's location permission.
// It uses the useMapStore hook to access the checkLocationPermission function from the map store
// and displays a vector icon inside the button.

export const ButtonLocation = (): JSX.Element => {
  const { requestGeolocation, userLocation, setInviteToShareLocationManually } =
    useMapStore();

  const onClickHandler = (): void => {
    requestGeolocation();

    if (!userLocation) {
      setInviteToShareLocationManually(true);
    }
    console.log('Requesting geolocation...');
  };

  return (
    <Button
      variant="secondary"
      onClick={onClickHandler}
      className="w-12 h-12 p-0 bg-[var(--background-secondary)]"
    >
      <GPSicon className="stroke-foreground w-6 h-6" width={25} height={25} />
    </Button>
  );
};
