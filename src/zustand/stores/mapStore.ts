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
  inputActive: boolean;

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
  setHideInviteAfterDelay: (ms: number) => void;
  setLocationError: (error: string | null) => void;
  setUserLocation: (loc: LatLngLiteral) => void;
  setInputActive: (value: boolean) => void;
  setInputInactiveAndHide: () => void;
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
      return reject(
        new Error(
          'Geolocation not supported, please enable it in your browser settings.'
        )
      );
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('Geolocation position shared by navigator:', pos);
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (error) => {
        reject(error);
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
      inputActive: false,

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

      setHideInviteAfterDelay: (ms: number): void => {
        if (typeof window === 'undefined') return;

        const w = window as typeof window & {
          __hideInviteTimeout?: ReturnType<typeof setTimeout> | null;
        };

        if (w.__hideInviteTimeout) {
          clearTimeout(w.__hideInviteTimeout);
        }

        w.__hideInviteTimeout = setTimeout(() => {
          const state = get();
          if (!state.inputActive) {
            set({ inviteToShareLocationManually: false });
            console.log('Invite hidden after delay');
          } else {
            console.log('User is typing — skipping hide');
          }
          w.__hideInviteTimeout = null;
        }, ms);
      },

      setInputActive: (value: boolean): void => {
        set({ inputActive: value });
      },

      setInputInactiveAndHide: () => {
        const state = get();
        if (!state.inputActive) {
          set({ inviteToShareLocationManually: false });
        }
      },

      setInviteToShareLocationManually: (value: boolean): void => {
        set({ inviteToShareLocationManually: value });
      },

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
            inviteToShareLocationManually: true,
            locationError: 'Failed to retrieve geolocation from navigator',
          });

          get().setHideInviteAfterDelay(5000);
        } catch (error) {
          console.warn('nothing provided:', error);
          set({
            locationError:
              error && typeof error === 'object' && 'message' in error
                ? (error as { message: string }).message +
                  ' tried failed showing input'
                : 'Failed to retrieve geolocation from all sources',
            inviteToShareLocationManually: true,
          });
          get().setHideInviteAfterDelay(5000);
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
