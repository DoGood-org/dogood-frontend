import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import coordsMatch from '@/lib/coordinatesMatch';
import getGeolocationPromise from '@/lib/getGeolocationPromise';
import { initializeMapIcons } from '@/lib/mapUtils';
import {
  EnumMapLayers,
  LeafletType,
  MapIcon,
  MarkerCategoryEnum,
  TCustomMarker,
} from '@/types/mapType';
import { LatLngLiteral, Map as LeafletMap } from 'leaflet';
import { IExtendedITaskProps } from '@/types/tasks.type';

let geoRequestInFlight: Promise<void> | null = null;

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
  customMarkers: TCustomMarker[] | [];

  taskListIsOpen: boolean;
  filtersIsOpen: boolean;

  clickedCoords: LatLngLiteral | null;
  showOptionsMenu: boolean;
  pendingFlyTo: LatLngLiteral | null;
  skipGeoPrompt: boolean;

  activePanel: 'filters' | 'tasks' | null;
  locationResolved: boolean;
  mapIcons: Record<MarkerCategoryEnum, MapIcon | null>;
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
  flyToCoords: (
    coords: LatLngLiteral,
    zoom?: number,
    mapKey?: 'main' | 'user',
    onDone?: () => void
  ) => boolean;
  locateMe: (mapKey?: 'main' | 'user') => Promise<void>;
  setClickedCoords: (coords: LatLngLiteral | null) => void;
  setShowOptionsMenu: (visible: boolean) => void;
  setPendingFlyTo: (coords: LatLngLiteral | null) => void;
  setSkipGeoPrompt: (value: boolean) => void;
  closeOptionsMenu: () => void;

  addMarker: (loc: TCustomMarker) => void;
  removeMarker: (loc: TCustomMarker) => void;
  checkLocationPermission: () => void;
  requestGeolocation: (manualLoc?: LatLngLiteral) => Promise<void>;
  setLocationResolved: (value: boolean) => void;
};

export type TMapProps = TMapState & TMapActions;

export const useMapStore = create<TMapState & TMapActions>()(
  persist(
    (set, get): TMapState & TMapActions => ({
      leafletComponents: null,
      activeLayer: EnumMapLayers.GoogleMaps,
      defaultLayers: [],
      fullscreenMap: false,
      toggleFullscreenMap: (fullscreen: boolean): void => {
        set({ fullscreenMap: fullscreen });
      },

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
        donation: null,
      },
      defaultLocation: { lat: 39.1567, lng: -75.5243 },
      userLocation: null,

      selectedTask: null,
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
      pendingFlyTo: null,
      skipGeoPrompt: false,
      locationResolved: false,

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
            donation: customIcons.donation,
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
      flyToCoords: (coords, zoom = 17, mapKey = 'main', onDone): boolean => {
        const map = get().mapInstances[mapKey];

        if (
          !map ||
          !map.getContainer()?.isConnected ||
          !Number.isFinite(coords.lat) ||
          !Number.isFinite(coords.lng)
        ) {
          return false;
        }

        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1440;
        const size = map.getSize();
        const baseOffset = isMobile ? 180 : isTablet ? 300 : 150;
        const offsetY = -Math.min(baseOffset, size.y * 0.25);

        map.stop();

        map.once('moveend', () => {
          map.once('moveend', () => onDone?.());
          map.panBy([0, offsetY], { animate: true });
        });

        map.flyTo(coords, zoom, {
          animate: true,
          duration: 1.5,
          easeLinearity: 0.5,
        });
        return true;
      },
      locateMe: async (mapKey = 'main'): Promise<void> => {
        if (!get().hasAgreedToLocation) {
          set({ showGeolocationPopup: true });
          return;
        }
        await get().requestGeolocation();
        const loc = get().userLocation;
        if (!loc) return;

        get().flyToCoords(loc, 15, mapKey);
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

        await requestGeolocation();
      },
      declineLocationSharing: (): void => {
        console.warn('User declined location sharing');
        set({
          hasAgreedToLocation: false,
          showGeolocationPopup: false,
          userLocation: null,
          locationError: null,
          locationResolved: true,
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
      removeMarker: (loc): any =>
        set((state) => ({
          customMarkers: state.customMarkers.filter(
            (m) => !coordsMatch(m, loc)
          ),
        })),

      setClickedCoords: (coords) => set({ clickedCoords: coords }),
      setShowOptionsMenu: (visible) => set({ showOptionsMenu: visible }),
      setPendingFlyTo: (coords) => set({ pendingFlyTo: coords }),
      setSkipGeoPrompt: (value) => set({ skipGeoPrompt: value }),
      setLocationResolved: (value) => set({ locationResolved: value }),

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
        // Якщо координати передані вручну — використовуємо їх
        if (manualLoc) {
          set({
            userLocation: manualLoc,
            locationError: null,
            showGeolocationPopup: false,
            locationResolved: true,
          });
          return;
        }

        if (geoRequestInFlight) return geoRequestInFlight;

        geoRequestInFlight = (async (): Promise<void> => {
          try {
            const coords = await getGeolocationPromise();

            if (!coords) {
              throw new Error('Geolocation returned empty coordinates');
            }

            set({
              userLocation: {
                lat: coords.lat,
                lng: coords.lng,
              },
              locationError: null,
              showGeolocationPopup: false,
              locationResolved: true,
            });

            console.info('[Zustand] Actual user location:', coords);
          } catch (error) {
            const code = (error as GeolocationPositionError)?.code;

            if (code === 1) {
              set({
                hasAgreedToLocation: false,
                showGeolocationPopup: false,
                locationError: 'Location permission denied in browser settings',
                userLocation: null,
                locationResolved: true,
              });
              return;
            }

            set({
              locationError:
                error instanceof Error
                  ? error.message
                  : 'Failed to retrieve geolocation',
              showGeolocationPopup: false,
              userLocation: null,
              locationResolved: true,
            });
          } finally {
            geoRequestInFlight = null;
          }
        })();

        return geoRequestInFlight;
      },
      setActivePanel: (panel: 'tasks' | 'filters' | null): any =>
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
