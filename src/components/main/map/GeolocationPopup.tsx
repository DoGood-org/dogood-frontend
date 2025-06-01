import { IGeolocationPopupProps } from '@/types/mapType';
import React, { FC } from 'react';

export const GeolocationPopup: FC<IGeolocationPopupProps> = ({
  requestGeolocation,
  declineGeolocation,
}) => {
  return (
    <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Share your location?</h3>
        <p className="mb-6">
          Would you like to share your current location to center the map on
          your position?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={declineGeolocation}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            No, thanks
          </button>
          <button
            onClick={requestGeolocation}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Yes, share
          </button>
        </div>
      </div>
    </div>
  );
};
