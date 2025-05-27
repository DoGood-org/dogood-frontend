import { LatLngLiteral } from 'leaflet';

export interface ReactLeafletModule {
  MapContainer: typeof import('react-leaflet').MapContainer;
  TileLayer: typeof import('react-leaflet').TileLayer;
  Marker: typeof import('react-leaflet').Marker;
  useMap: typeof import('react-leaflet').useMap;
  ZoomControl: typeof import('react-leaflet').ZoomControl;
  useMapEvents: typeof import('react-leaflet').useMapEvents;
}
export type MapLocation = LatLngLiteral & { id: string; title: string };

export type MapProps = {
  center: LatLngLiteral;
  locations: MapLocation[];
  onLocationSelect?: (coords: LatLngLiteral) => void;
  allowClickToAddMarker?: boolean;
};

export interface IPropsFilters {
  setIsSettingOpen: (isOpen: boolean) => void;
}
