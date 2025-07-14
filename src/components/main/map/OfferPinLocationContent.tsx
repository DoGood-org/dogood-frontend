'use client';
import { Button } from '@/components/ui/Button';
import { useMapStore } from '@/zustand/stores/mapStore';

export const OfferPinLocationContent = () => {
  const { clickedCoords, setOfferPinLocation, setUserLocation, userLocation } =
    useMapStore();
  console.log('OfferPinLocationContent', userLocation);
  return (
    <div>
      <p>
        Do you want to pin this location? <strong>Click to confirm</strong>
      </p>
      <Button
        className="mt-2 bg-background text-foreground px-2 py-1 rounded"
        onClick={() => {
          if (clickedCoords) {
            setUserLocation(clickedCoords);
          }
          setOfferPinLocation(false);
        }}
      >
        Pin Location
      </Button>
    </div>
  );
};
