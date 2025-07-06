import { Icon, LatLngLiteral } from 'leaflet';
import { ReactElement } from 'react';
export enum MarkerCategoryEnum {
  Medicine = 'medicine',
  Nature = 'nature',
  Animal = 'animal',
  Food = 'food',
  MyPosition = 'myPosition',
  Default = 'default',
}
export interface ReactLeafletModule {
  MapContainer: typeof import('react-leaflet').MapContainer;
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
}
export type MapLocation = LatLngLiteral & {
  id: string;
  title: string;
  category?: MarkerCategoryEnum;
  distance?: string;
  description?: string;
  icon?: Icon | null;
};

export interface IAcceptShareLocationProps {
  requestGeolocation: () => void;
  declineGeolocation: () => void;
}

export interface IFormLocation {
  location: string;
}

export interface TCustomForm {
  control: L.Control;
  data?: IFormLocation;
}
export type TCustomMarker = LatLngLiteral & { category?: MarkerCategoryEnum };

export interface SelectedLocationProps {
  center: LatLngLiteral;
  userLocation?: LatLngLiteral;
}

export interface RenderMarksProps {
  locations: MapLocation[];
  setSelectedLocation: (location: MapLocation) => void;
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
export type IExtendedCategoryFilter = MarkerCategoryEnum | 'all' | null;
export type IDistanceFilter = '1' | '5' | '10' | '20' | '50' | null;
export interface IFilterStore {
  choosenCategories: IExtendedCategoryFilter[];
  distanceFilter: IDistanceFilter;
  searchQuery: string;
  sortBy: 'title' | 'distance';
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

export interface IDistanceItem {
  title: string;
  value: string;
}

export type TranslationFunction = (key: string) => string;

export interface ITask {
  title: string;
  subtitle: string;
  icon?: ReactElement;
  category: MarkerCategoryEnum[];
  description: string;
  distance: string;
  lat: number;
  lng: number;
  id: string;
}

export interface IExtendedITaskProps extends ITask {
  isSelected?: boolean;
  onToggleDescription?: () => void;
}

export interface IIconData {
  icon: ReactElement;
  color: string;
}

export interface IIconMap {
  [key: string]: IIconData;
}

export type MapIcons = {
  medicineIcon: Icon | null;
  natureIcon: Icon | null;
  animalIcon: Icon | null;
  foodIcon: Icon | null;
  myPositionIcon: Icon | null;
  defaultIcon: Icon | null;
};

export type LeafletModule = {
  Icon: typeof Icon;
  icon: typeof Icon;
};

import L from 'leaflet';
export type LeafletType = typeof L;
