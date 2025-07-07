import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LatLngLiteral, Map as LeafletMap } from 'leaflet';
import { IExtendedITaskProps, TCustomMarker } from '@/types/mapType';
import coordsMatch from '@/lib/coordinatesMatch';
import getGeolocationPromise from '@/lib/getGeolocationPromise';

type TMapState = {
  map: LeafletMap | null;
  hasAgreedToLocation: boolean;
  showGeolocationPopup: boolean;
  inputActive: boolean;

  userLocation: LatLngLiteral | null;
  locationError: string | null;
  selectedTask: IExtendedITaskProps | null;
  customMarkers: TCustomMarker[] | [];

  taskListIsOpen: boolean;
  filtersIsOpen: boolean;

  activePanel: 'filters' | 'tasks' | null;
};

type TMapActions = {
  setMap: (map: LeafletMap) => void;
  setHasAgreedToLocation: (value: boolean) => void;
  setShowGeolocationPopup: (value: boolean) => void;
  setLocationError: (error: string | null) => void;
  setUserLocation: (loc: LatLngLiteral) => void;
  setCustomMarkers: (markers: TCustomMarker[]) => void;
  toggleTaskList: () => void;
  toggleFilters: () => void;
  addMarker: (loc: TCustomMarker) => void;
  removeMarker: (loc: TCustomMarker) => void;
  checkLocationPermission: () => void;
  requestGeolocation: (manualLoc?: LatLngLiteral) => Promise<void>;
  setActivePanel: (panel: 'filters' | 'tasks' | null) => void;
};

export type TMapProps = TMapState & TMapActions;

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
      inputActive: false,
      taskListIsOpen: false,
      filtersIsOpen: false,
      activePanel: null,

      setMap: (map) => set({ map }),
      setUserLocation: (loc) => set({ userLocation: loc }),
      setLocationError: (error) => set({ locationError: error }),
      setCustomMarkers: (markers) => set({ customMarkers: markers }),

      setHasAgreedToLocation: (value): void => {
        console.log('[Zustand] agreeToShareLocation set to:', value);
        set({ hasAgreedToLocation: value });
      },

      setShowGeolocationPopup: (value): void =>
        set({ showGeolocationPopup: value }),
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
            });
            console.log('Manual location set:', manualLoc);
            return;
          }

          // Nothing available
          set({
            locationError: 'Failed to retrieve geolocation from navigator',
          });
        } catch (error) {
          console.warn('nothing provided:', error);
          set({
            locationError:
              error && typeof error === 'object' && 'message' in error
                ? (error as { message: string }).message +
                  ' tried failed showing input'
                : 'Failed to retrieve geolocation from all sources',
          });
        }
      },
      setActivePanel: (panel): void => set({ activePanel: panel }),

      toggleFilters: () =>
        set((state) => ({
          filtersIsOpen: !state.filtersIsOpen,
          taskListIsOpen: false,
          activePanel: !state.filtersIsOpen ? 'filters' : null,
        })),

      toggleTaskList: () =>
        set((state) => ({
          taskListIsOpen: !state.taskListIsOpen,
          filtersIsOpen: false,
          activePanel: !state.taskListIsOpen ? 'tasks' : null,
        })),
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
