// *   Returns a promise that resolves with the user's geolocation coordinates
// *   or rejects with an error if geolocation is not supported or fails.
// *   @returns {Promise<LatLngLiteral>} A promise that resolves with the user's geolocation coordinates.
// *   @throws {Error} If geolocation is not supported or an error occurs while retrieving the coordinates.

import { LatLngLiteral } from 'leaflet';

function getGeolocationPromise(): Promise<LatLngLiteral> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(
        new Error(
          'Geolocation not supported, please enable it in your browser settings.'
        )
      );
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (error) => reject(error),
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  });
}

export default getGeolocationPromise;
