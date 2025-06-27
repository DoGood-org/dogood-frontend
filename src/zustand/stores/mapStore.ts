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
  userLocation: LatLngLiteral | null;
  locationError?: string | null;
  setLocationError?: (error: string | null) => void;
  selectedTask: TTask | null;
  customMarkers: TCustomMarker[] | [];
};

type TMapActions = {
  setMap: (map: LeafletMap) => void;
  setHasAgreedToLocation: (value: boolean) => void;
  setShowGeolocationPopup: (value: boolean) => void;
  setUserLocation: (loc: LatLngLiteral) => void;
  setSelectedTask: (task: TTask | null) => void;
  setCustomMarkers: (markers: TCustomMarker[]) => void;
  addMarker: (loc: TCustomMarker) => void;
  removeMarker: (loc: TCustomMarker) => void;
  checkLocationPermission: () => void;
  requestGeolocation: (manualLoc?: LatLngLiteral) => Promise<void>;
};

export type TMapProps = TMapState & TMapActions;


const LS_KEY = 'userAgreeToShareLocation';

const coordsMatch = (a: LatLngLiteral, b: LatLngLiteral) =>
  Math.abs(a.lat - b.lat) < 0.0001 && Math.abs(a.lng - b.lng) < 0.0001;

function getGeolocationPromise(): Promise<LatLngLiteral> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation not supported'));
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err)
    );
  });
}
export const useMapStore = create<TMapState & TMapActions>()(
  persist(
    (set, get) => ({
      map: null,
      userLocation: null,
      selectedTask: null,
      customMarkers: [],
      locationError: null,
      hasAgreedToLocation: false,
      showGeolocationPopup: false,

      setMap: (map) => set({ map }),
      setUserLocation: (loc) => set({ userLocation: loc }),
      setSelectedTask: (task) => set({ selectedTask: task }),
      setLocationError: (error) => set({ locationError: error }),
      setCustomMarkers: (markers) => set({ customMarkers: markers }),

      setHasAgreedToLocation: (value) => {
        console.log('[Zustand] agreeToShareLocation set to:', value);
        set({ hasAgreedToLocation: value });
      },

      setShowGeolocationPopup: (value) => set({ showGeolocationPopup: value }),

      addMarker: (loc) => {
        const exists = get().customMarkers.some((m) => coordsMatch(m, loc));
        if (!exists) {
          set((state) => ({
            customMarkers: [...state.customMarkers, loc],
          }));
        }
      },

      removeMarker: (loc) =>
        set((state) => ({
          customMarkers: state.customMarkers.filter(
            (m) => !coordsMatch(m, loc)
          ),
        })),

      checkLocationPermission: () => {
        if (typeof window === 'undefined') return;
        if (get().hasAgreedToLocation) {
          get().requestGeolocation();     
          console.log('User already agreed, requesting geolocation, dont bother with popup...');
        } else {
          set({ showGeolocationPopup: true });
          console.log('User has not agreed, showing popup...');
        }
      },

      requestGeolocation: async (manualLoc) => {
        try {
          const coords = manualLoc ?? (await getGeolocationPromise());
          set({ userLocation: coords, locationError: null });
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
      partialize: (state) => ({
        hasAgreedToLocation: state.hasAgreedToLocation,
        userLocation: state.userLocation,
        customMarkers: state.customMarkers,
      }),
    }
  )
);