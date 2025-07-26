import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import coordsMatch from '@/lib/coordinatesMatch';
import getGeolocationPromise from '@/lib/getGeolocationPromise';
import { initializeMapIcons } from '@/lib/mapUtils';
import {
  EnumMapLayers,
  LeafletType,
  MarkerCategoryEnum,
  TCustomMarker,
} from '@/types/mapType';
import { LatLngLiteral, Map as LeafletMap } from 'leaflet';
import { IExtendedITaskProps } from '@/types/tasks.type';

export interface IReactLeafletModule {
  MapContainer: React.FC<any>;
  TileLayer: typeof import('react-leaflet').TileLayer;
  Marker: typeof import('react-leaflet').Marker;
  useMap: typeof import('react-leaflet').useMap;
  ZoomControl: typeof import('react-leaflet').ZoomControl;
  LayersControl: typeof import('react-leaflet').LayersControl;
  Popup: typeof import('react-leaflet').Popup;
  Circle: typeof import('react-leaflet').Circle;
  Polyline: typeof import('react-leaflet').Polyline;
  GeoJSON: typeof import('react-leaflet').GeoJSON;
  useMapEvent: typeof import('react-leaflet').useMapEvent;
  Control: typeof import('leaflet').Control;
  LayerGroup: typeof import('react-leaflet').LayerGroup;
  useMapEvents: typeof import('react-leaflet').useMapEvents;
  Tooltip?: typeof import('react-leaflet').Tooltip; // Optional, if Tooltip is used
}

type TMapState = {
  leafletComponents: IReactLeafletModule | null;
  mapInstances: Record<'main' | 'user', LeafletMap | null>;
  setMapInstance: (key: 'main' | 'user', map: LeafletMap) => void;
  mapIcons: Record<MarkerCategoryEnum, L.Icon | null>;

  defaultLayers: {
    [key in EnumMapLayers]: {
      name: string;
      url: string;
      attribution?: string;
    } | null;
  }[];
  activeLayer: EnumMapLayers;
  radius: number;
  setRadius: (radius: number) => void;
  layerDropIsOpen: boolean;
  fullscreenMap: boolean;

  hasAgreedToLocation: boolean | null;
  showGeolocationPopup: boolean;
  defaultLocation: LatLngLiteral;

  userLocation: LatLngLiteral | null;
  locationError: string | null;

  selectedTask: IExtendedITaskProps | null;
  highlightedTaskId: string | null;
  customMarkers: TCustomMarker[] | [];

  taskListIsOpen: boolean;
  filtersIsOpen: boolean;

  clickedCoords: LatLngLiteral | null;
  showOptionsMenu: boolean;

  activePanel: 'filters' | 'tasks' | null;
};

type TMapActions = {
  setLeafletComponents: (components: IReactLeafletModule) => void;
  setActiveLayer: (layer: EnumMapLayers) => void;
  toggleLayerDrop: () => void;
  setMapIcons: (icons: TMapState['mapIcons']) => void;
  initMap: (key: 'main' | 'user') => Promise<void>;
  setHasAgreedToLocation: (value: boolean) => void;
  setShowGeolocationPopup: (value: boolean) => void;
  setLocationError: (error: string | null) => void;
  setUserLocation: (loc: LatLngLiteral) => void;
  setCustomMarkers: (markers: TCustomMarker[]) => void;
  setActivePanel: (panel: 'filters' | 'tasks' | null) => void;

  acceptLocationSharing: () => Promise<void>;
  declineLocationSharing: () => void;

  toggleFullscreenMap: (fullscreen: boolean) => void;

  togglePanel: (panel: 'tasks' | 'filters') => void;
  flyToCoords: (coords: LatLngLiteral, zoom?: number) => void;
  setHighlightedTaskId: (id: string | null) => void;

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
      leafletComponents: null,
      activeLayer: EnumMapLayers.GoogleMaps,
      defaultLayers: [],
      fullscreenMap: false,
      toggleFullscreenMap: () =>
        set((state) => ({ fullscreenMap: !state.fullscreenMap })),

      layerDropIsOpen: false,
      mapInstances: {
        main: null,
        user: null,
      },
      setMapInstance: (key: 'main' | 'user', map: LeafletMap): void => {
        set((state) => ({
          mapInstances: {
            ...state.mapInstances,
            [key]: map,
          },
        }));
      },

      mapIcons: {
        medicine: null,
        nature: null,
        animal: null,
        food: null,
        myPosition: null,
        default: null,
        myPin: null,
      },
      defaultLocation: { lat: 48.8566, lng: 2.3522 }, // Default to Paris
      userLocation: null,

      selectedTask: null,
      highlightedTaskId: null,
      customMarkers: [],
      locationError: null,
      hasAgreedToLocation: null,
      showGeolocationPopup: false,
      radius: 3000,
      setRadius: (r: number) =>
        set((state) => {
          if (Math.abs(r - state.radius) > 200) {
            return { radius: r };
          }
          return state;
        }),
      taskListIsOpen: false,
      filtersIsOpen: false,
      activePanel: null,

      clickedCoords: null,
      showOptionsMenu: false,

      // *Actions*//

      setLeafletComponents: (components): void => {
        set({ leafletComponents: components });
      },
      initMap: async (): Promise<void> => {
        if (get().leafletComponents) return;
        if (typeof window === 'undefined') return;
        const [reactLeafletModule, L] = await Promise.all([
          import('react-leaflet'),
          import('leaflet'),
        ]);
        const customIcons = initializeMapIcons(L as unknown as LeafletType);

        set({
          mapIcons: {
            medicine: customIcons.medicine,
            nature: customIcons.nature,
            animal: customIcons.animal,
            food: customIcons.food,
            myPosition: customIcons.myPosition,
            default: customIcons.default,
            myPin: customIcons.myPin,
          },

          leafletComponents: {
            MapContainer: reactLeafletModule.MapContainer,
            TileLayer: reactLeafletModule.TileLayer,
            Marker: reactLeafletModule.Marker,
            ZoomControl: reactLeafletModule.ZoomControl,
            useMapEvent: reactLeafletModule.useMapEvent,
            LayersControl: reactLeafletModule.LayersControl,
            LayerGroup: reactLeafletModule.LayerGroup,
            useMap: reactLeafletModule.useMap,
            Popup: reactLeafletModule.Popup,
            Circle: reactLeafletModule.Circle,
            Polyline: reactLeafletModule.Polyline,
            GeoJSON: reactLeafletModule.GeoJSON,
            Control: L.Control,
            useMapEvents: reactLeafletModule.useMapEvents,
          } as IReactLeafletModule,
        });
      },

      setActiveLayer: (layer: EnumMapLayers): void => {
        set({ activeLayer: layer });
      },
      toggleLayerDrop: (): void => {
        set((state) => ({ layerDropIsOpen: !state.layerDropIsOpen }));
      },
      setMapIcons: (icons) => set({ mapIcons: icons }),
      setUserLocation: (loc) =>
        set({
          userLocation: loc,
          locationError: null,
          showGeolocationPopup: false,
          clickedCoords: null,
        }),
      flyToCoords: (coords, zoom = 15): void => {
        const map = get().mapInstances?.main;
        if (!map) {
          return;
        }
        if (map) {
          map.flyTo(coords, zoom, {
            duration: 1.5,
          });
        }
      },
      setHighlightedTaskId: (id: string | null): void => {
        set({ highlightedTaskId: id });
      },

      setLocationError: (error) => set({ locationError: error }),
      setCustomMarkers: (markers) => set({ customMarkers: markers }),
      setHasAgreedToLocation: (value): void => {
        console.info('[Zustand] agreeToShareLocation set to:', value);
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
        console.warn('User declined location sharing');
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
          console.info(
            '[Zustand] User already agreed, requesting geolocation, dont bother with popup...'
          );
        } else {
          set({ showGeolocationPopup: true });
          console.warn('[Zustand] User has not agreed, showing popup...');
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
                showGeolocationPopup: false,
              });
              console.info(
                '[Zustand] User location set from navigator:',
                coords
              );
            } else {
              console.info('[Zustand] Skipping update — same coordinates');
            }
            return;
          }

          // If manual location is provided, use it

          if (manualLoc) {
            set({
              userLocation: manualLoc,
              locationError: null,
              showGeolocationPopup: false,
            });
            console.info('[Zustand] Manual location set:', manualLoc);
            return;
          }

          // No navigator location and no manual fallback
          console.warn(
            '[Zustand] No coordinates from navigator or manual input'
          );
          set({
            userLocation: null,
            locationError: 'Failed to retrieve geolocation from navigator',
            showGeolocationPopup: false,
          });
        } catch (error) {
          console.warn('[Zustand] Geolocation access failed:', error);
          set({
            locationError:
              typeof error === 'object' && error && 'message' in error
                ? `${(error as { message: string }).message} — showing fallback pin`
                : 'Failed to retrieve geolocation from all sources',
            showGeolocationPopup: false,
            userLocation: get().defaultLocation,
          });
        }
      },

      setActivePanel: (panel: 'tasks' | 'filters' | null): void =>
        set({ activePanel: panel }),

      togglePanel: (panel: 'tasks' | 'filters') =>
        set((state) => ({
          activePanel: state.activePanel === panel ? null : panel,
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
