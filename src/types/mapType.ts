import { Icon, LatLngLiteral } from 'leaflet';
import { ReactElement } from 'react';

export interface ReactLeafletModule {
  MapContainer: typeof import('react-leaflet').MapContainer;
  TileLayer: typeof import('react-leaflet').TileLayer;
  Marker: typeof import('react-leaflet').Marker;
  useMap: typeof import('react-leaflet').useMap;
  ZoomControl: typeof import('react-leaflet').ZoomControl;
  useMapEvents: typeof import('react-leaflet').useMapEvents;
}
export type MapLocation = LatLngLiteral & { id: string; title: string };

export interface IAcceptShareLocationProps {
  requestGeolocation: () => void;
  declineGeolocation: () => void;
}
export enum MarkerCategoryEnum {
  Medicine = 'medicine',
  Nature = 'nature',
  Animal = 'animal',
  Food = 'food',
  MyPosition = 'myPosition',
}
export type TCustomMarker = LatLngLiteral & { category?: MarkerCategoryEnum };

export interface SelectedLocationProps {
  center: LatLngLiteral;
  userLocation?: LatLngLiteral;
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
  selectedDistances: string[];
  selectedCategoryButtons: React.ReactElement[];
  selectedDistanceButtons: React.ReactElement[];
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

export interface MapClickHandlerProps {
  onClick: (latlng: LatLngLiteral) => void;
  allowClickToAddMarker?: boolean;
}

export interface CategoryItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  color: string;
}

export interface DistanceItem {
  title: string;
}

export type TranslationFunction = (key: string) => string;

export interface ITasksProps {
  title: string;
  subtitle: string;
  category: string[];
  description: string;
  distance: string;
  onToggleDescription: () => void;
}

export interface ExtendedITasksProps extends ITasksProps {
  isSelected: boolean;
  onToggleDescription: () => void;
}

export interface IconData {
  icon: ReactElement;
  color: string;
}

export interface IconMap {
  [key: string]: IconData;
}

export type MapIcons = {
  medicineIcon: Icon | null;
  natureIcon: Icon | null;
  animalIcon: Icon | null;
  foodIcon: Icon | null;
  myPositionIcon: Icon | null;
};

export interface CategoryIconsListProps {
  categories: any[];
  getCategoryIcon: (item: any) => IconData;
}

export type LeafletModule = {
  Icon: typeof Icon;
  icon: typeof Icon;
};

import type L from 'leaflet';

export type LeafletType = typeof L;
