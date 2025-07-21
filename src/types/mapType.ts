import { Icon, LatLngLiteral } from 'leaflet';
import { ReactElement } from 'react';
export enum MarkerCategoryEnum {
  Medicine = 'medicine',
  Nature = 'nature',
  Animal = 'animal',
  Food = 'food',
  MyPosition = 'myPosition',
  Default = 'default',
  MyPin = 'myPin',
}

export type MapLocation = LatLngLiteral & {
  id: string;
  title: string;
  category?: MarkerCategoryEnum;
  distance?: string;
  description?: string;
  icon?: Icon | null;
};

export enum EnumMapLayers {
  Satellite = 'EsriSatellite',
  OpenStreetMap = 'OpenStreetMap',
  GoogleMaps = 'GoogleMaps',
}
export enum EnumUserLayers {
  CustomMarkers = 'CustomMarkers',
  MyTasks = 'MyTasks',
}

// for <TileLayer> component
export type TMapLayerType = {
  [key in EnumMapLayers]: {
    name: string;
    url: string;
    attribution?: string;
  };
};

// export interface IAcceptShareLocationProps {
//   requestGeolocation: () => void;
//   declineGeolocation: () => void;
// }

export interface IFormLocation {
  location: string;
}

export interface TCustomForm {
  control: L.Control;
  data?: IFormLocation;
}
export type TCustomMarker = LatLngLiteral & {
  id: string;
  title?: string;
  description?: string;
  icon?: Icon | null;
  category?: MarkerCategoryEnum;
  createdAt?: Date;
  updatedAt?: Date;
};

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
export type IDistanceFilter = '1' | '3' | '5' | '10' | '20' | '50' | null;
export interface IFilterStore {
  choosenCategories: IExtendedCategoryFilter[];
  distanceFilter: IDistanceFilter;
  searchQuery: string;
  sortBy: 'title' | 'distance';
}
export type MapClickType = 'left' | 'right' | 'double';

export interface IMapClickHandlerProps {
  onClick: (coords: LatLngLiteral, clickType: MapClickType) => void;
  allowClickToAddMarker?: boolean;

  clickOptions?: {
    setMe: (location: LatLngLiteral) => void;
    setMyMarker: (location: LatLngLiteral) => void;
  };

  setClickedCoords?: (latlng: LatLngLiteral) => void;
  setShowOptionsMenu?: (visible: boolean) => void;
  onCloseMenu?: () => void;
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
  medicine: Icon | null;
  nature: Icon | null;
  animal: Icon | null;
  food: Icon | null;
  myPosition: Icon | null;
  default: Icon | null;
  myPin: Icon | null;
};

export type LeafletModule = {
  Icon: typeof Icon;
  icon: typeof Icon;
};

import L from 'leaflet';
export type LeafletType = typeof L;
