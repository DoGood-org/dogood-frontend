import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LatLngLiteral, Map as LeafletMap } from 'leaflet';
import { MarkerCategoryEnum, TCustomMarker } from '@/types/mapType';

type TTask = {
  id: string;
  lat: number;
  lng: number;
  category: MarkerCategoryEnum[];
  title: string;
  description?: string;
  distance?: string;
};

type TMapState = {
  map: LeafletMap | null;
  hasAgreedToLocation: boolean;
  showGeolocationPopup: boolean;
  inviteToShareLocationManually: boolean;
  userLocation: LatLngLiteral | null;
  locationError: string | null;
  selectedTask: TTask | null;
  customMarkers: TCustomMarker[] | [];
};

type TMapActions = {
  setMap: (map: LeafletMap) => void;
  setHasAgreedToLocation: (value: boolean) => void;
  setShowGeolocationPopup: (value: boolean) => void;
  setInviteToShareLocationManually: (value: boolean) => void;
  setLocationError: (error: string | null) => void;
  setUserLocation: (loc: LatLngLiteral) => void;
  setSelectedTask: (task: TTask | null) => void;
  setCustomMarkers: (markers: TCustomMarker[]) => void;
  addMarker: (loc: TCustomMarker) => void;
  removeMarker: (loc: TCustomMarker) => void;
  checkLocationPermission: () => void;
  requestGeolocation: (manualLoc?: LatLngLiteral) => Promise<void>;
};

export type TMapProps = TMapState & TMapActions;

// Helper function to compare two coordinates from local storage and geolocation
// *   @param {LatLngLiteral} a - The first set of coordinates.
// *   @param {LatLngLiteral} b - The second set of coordinates.
const coordsMatch = (a: LatLngLiteral, b: LatLngLiteral): boolean =>
  Math.abs(a.lat - b.lat) < 0.0001 && Math.abs(a.lng - b.lng) < 0.0001;

// *   Returns a promise that resolves with the user's geolocation coordinates
// *   or rejects with an error if geolocation is not supported or fails.
// *   @returns {Promise<LatLngLiteral>} A promise that resolves with the user's geolocation coordinates.
// *   @throws {Error} If geolocation is not supported or an error occurs while retrieving the coordinates.

function getGeolocationPromise(): Promise<LatLngLiteral> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation not supported'));
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('Geolocation position shared by navigator:', pos);
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err: GeolocationPositionError) => {
        console.log('Geolocation error:', err);
        reject(err);
      }
    );
  });
}
export const useMapStore = create<TMapState & TMapActions>()(
  persist(
    (set, get): TMapState & TMapActions => ({
      map: null,
      userLocation: null,
      selectedTask: null,
      customMarkers: [],
      locationError: null,
      hasAgreedToLocation: false,
      showGeolocationPopup: false,
      inviteToShareLocationManually: false,

      setMap: (map) => set({ map }),
      setUserLocation: (loc) => set({ userLocation: loc }),
      setSelectedTask: (task) => set({ selectedTask: task }),
      setLocationError: (error) => set({ locationError: error }),
      setCustomMarkers: (markers) => set({ customMarkers: markers }),

      setHasAgreedToLocation: (value): void => {
        console.log('[Zustand] agreeToShareLocation set to:', value);
        set({ hasAgreedToLocation: value });
      },

      setShowGeolocationPopup: (value): void =>
        set({ showGeolocationPopup: value }),

      setInviteToShareLocationManually: (value): void =>
        set({ inviteToShareLocationManually: value }),

      addMarker: (loc): void => {
        const exists = get().customMarkers.some((m) => coordsMatch(m, loc));
        if (!exists) {
          set((state) => ({
            customMarkers: [...state.customMarkers, loc],
          }));
        }
      },

      removeMarker: (loc): void =>
        set((state) => ({
          customMarkers: state.customMarkers.filter(
            (m) => !coordsMatch(m, loc)
          ),
        })),

      checkLocationPermission: (): void => {
        if (typeof window === 'undefined') return;
        if (get().hasAgreedToLocation) {
          get().requestGeolocation();
          console.log(
            'User already agreed, requesting geolocation, dont bother with popup...'
          );
        } else {
          set({ showGeolocationPopup: true });
          console.log('User has not agreed, showing popup...');
        }
      },

      requestGeolocation: async (manualLoc?: LatLngLiteral): Promise<void> => {
        try {
          const coords = await getGeolocationPromise();
          // If we have coordinates from geolocation navigator, use them
          if (coords) {
            const userLocation = get().userLocation;
            const alreadyUpToDate = userLocation
              ? coordsMatch(userLocation, coords)
              : false;
            if (!alreadyUpToDate) {
              set({
                userLocation: coords,
                locationError: null,
                inviteToShareLocationManually: false,
              });
              console.log('User location set from navigator:', coords);
            } else {
              console.log('Skipping update — same coordinates');
            }
            return;
          }

          // If manual location is provided, use it

          if (manualLoc) {
            set({
              userLocation: manualLoc,
              locationError: null,
              inviteToShareLocationManually: false,
            });
            console.log('Manual location set:', manualLoc);
            return;
          }

          // Nothing available
          set({
            locationError:
              'No coordinates available from geolocation or manual input',
            inviteToShareLocationManually: true,
          });
          console.warn('Failed to set user location');
        } catch (error) {
          console.warn('Geolocation error:', error);
          set({
            locationError:
              error instanceof Error ? error.message : String(error),
          });
        }
      },
    }),
    {
      name: 'map-storage',
      partialize: function (
        state
      ): Pick<TMapState, 'hasAgreedToLocation' | 'customMarkers'> {
        return {
          hasAgreedToLocation: state.hasAgreedToLocation,
          customMarkers: state.customMarkers,
        };
      },
    }
  )
);
