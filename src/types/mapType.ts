import { LatLngLiteral } from 'leaflet';
import { ReactNode } from 'react';
//Map types
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

export interface IGeolocationPopupProps {
  requestGeolocation: () => void;
  declineGeolocation: () => void;
}

export interface SelectedLocationProps {
  center: LatLngLiteral;
  userLocation?: LatLngLiteral; // Making this optional since it's used with || operator
}

export interface RenderMarksProps {
  locations: Location[];
  setSelectedLocation: (location: Location) => void;
  setClickedCoords: (coords: LatLngLiteral) => void;
  onLocationSelect?: (coords: LatLngLiteral) => void;
}

//filter types
export interface IPropsFilters {
  setIsSettingOpen: (isOpen: boolean) => void;
}
export interface IPropsFilterPanel {
  selectedCategories: string[];
  selectedCategoryButtons: ReactNode;
  selectedDistances: string[];
  selectedDistanceButtons: ReactNode;
}

export interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryToggle: (id: string) => void;
}
export interface DistanceFilterProps {
  selectedDistances: string[];
  onDistanceToggle: (id: string) => void;
}
export interface FiltersProps
  extends IPropsFilters,
    CategoryFilterProps,
    DistanceFilterProps {}

export interface FilterButtonProps {
  items: string[];
  onRemove: (item: string) => void;
  buttonClassName?: string;
  keyPrefix?: string;
}

//types for constants
export interface CategoryItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
}

export interface DistanceItem {
  title: string;
}

export type TranslationFunction = (key: string) => string;
