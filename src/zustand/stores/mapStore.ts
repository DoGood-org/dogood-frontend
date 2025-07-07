import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LatLngLiteral, Map as LeafletMap } from 'leaflet';
import {
  IExtendedITaskProps,
  MarkerCategoryEnum,
  IReactLeafletModule,
  TCustomMarker,
} from '@/types/mapType';
import coordsMatch from '@/lib/coordinatesMatch';
import getGeolocationPromise from '@/lib/getGeolocationPromise';

type TMapState = {
  map: LeafletMap | null;
  leafletComponents: IReactLeafletModule | null;
  mapIcons: Record<MarkerCategoryEnum, L.Icon | null>;

  hasAgreedToLocation: boolean | null;
  showGeolocationPopup: boolean;

  userLocation: LatLngLiteral | null;
  locationError: string | null;

  selectedTask: IExtendedITaskProps | null;
  customMarkers: TCustomMarker[] | [];

  taskListIsOpen: boolean;
  filtersIsOpen: boolean;

  clickedCoords: LatLngLiteral | null;
  showOptionsMenu: boolean;

  activePanel: 'filters' | 'tasks' | null;
};

type TMapActions = {
  setMap: (map: LeafletMap) => void;
  setLeafletComponents: (components: IReactLeafletModule) => void;

  setMapIcons: (icons: TMapState['mapIcons']) => void;

  setHasAgreedToLocation: (value: boolean) => void;
  setShowGeolocationPopup: (value: boolean) => void;
  setLocationError: (error: string | null) => void;
  setUserLocation: (loc: LatLngLiteral) => void;
  setCustomMarkers: (markers: TCustomMarker[]) => void;
  setActivePanel: (panel: 'filters' | 'tasks' | null) => void;

  acceptLocationSharing: () => Promise<void>;
  declineLocationSharing: () => void;

  toggleTaskList: () => void;
  toggleFilters: () => void;

  setClickedCoords: (coords: LatLngLiteral | null) => void;
  setShowOptionsMenu: (visible: boolean) => void;
  closeOptionsMenu: () => void;

  addMarker: (loc: TCustomMarker) => void;
  removeMarker: (loc: TCustomMarker) => void;
  checkLocationPermission: () => void;
  requestGeolocation: (manualLoc?: LatLngLiteral) => Promise<void>;
};

export type TMapProps = TMapState & TMapActions;

export const useMapStore = create<TMapState & TMapActions>()(
  persist(
    (set, get): TMapState & TMapActions => ({
      map: null,
      setMap: (map: LeafletMap): void => {
        set({ map });
      },
      leafletComponents: null,
      setLeafletComponents: (components) =>
        set({ leafletComponents: components }),

      mapIcons: {
        medicine: null,
        nature: null,
        animal: null,
        food: null,
        myPosition: null,
        default: null,
        myPin: null,
      },
      userLocation: null,
      selectedTask: null,
      customMarkers: [],
      locationError: null,
      hasAgreedToLocation: null,
      showGeolocationPopup: false,

      taskListIsOpen: false,
      filtersIsOpen: false,
      activePanel: null,

      clickedCoords: null,
      showOptionsMenu: false,

      setMapIcons: (icons) => set({ mapIcons: icons }),

      setUserLocation: (loc) => set({ userLocation: loc }),
      setLocationError: (error) => set({ locationError: error }),
      setCustomMarkers: (markers) => set({ customMarkers: markers }),

      setHasAgreedToLocation: (value): void => {
        console.log('[Zustand] agreeToShareLocation set to:', value);
        set({ hasAgreedToLocation: value });
      },

      setShowGeolocationPopup: (value: boolean): void => {
        if (get().hasAgreedToLocation) {
          set({ showGeolocationPopup: value });
        }
      },

      acceptLocationSharing: async (): Promise<void> => {
        const {
          hasAgreedToLocation,
          setHasAgreedToLocation,
          setShowGeolocationPopup,
          requestGeolocation,
        } = get();

        if (!hasAgreedToLocation) {
          setHasAgreedToLocation(true);
        }

        setShowGeolocationPopup(false);

        try {
          await requestGeolocation();
        } catch (err) {
          console.error('Geolocation request failed:', err);
        }

        const error = get().locationError;
        if (error) {
          console.warn(
            'User may need to enable location access manually in the browser.',
            error
          );
        }
      },
      declineLocationSharing: (): void => {
        console.log('User declined location sharing');
        set({
          hasAgreedToLocation: false,
          showGeolocationPopup: false,
          userLocation: null,
          locationError: null,
        });
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

      setClickedCoords: (coords) => set({ clickedCoords: coords }),
      setShowOptionsMenu: (visible) => set({ showOptionsMenu: visible }),

      closeOptionsMenu: () =>
        set({
          showOptionsMenu: false,
          clickedCoords: null,
        }),

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
          console.warn(
            'navigator refused to share location, we may need to check the setting in the browser',
            error
          );
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
