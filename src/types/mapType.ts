import { Icon, LatLngLiteral } from 'leaflet';
import { ReactElement } from 'react';

export const enum MarkerCategoryEnum {
  Medicine = 'medicine',
  Nature = 'nature',
  Animal = 'animal',
  Food = 'food',
  MyPosition = 'myPosition',
  Default = 'default',
  MyPin = 'myPin',
}
export const enum EnumMapLayers {
  Satellite = 'EsriSatellite',
  OpenStreetMap = 'OpenStreetMap',
  GoogleMaps = 'GoogleMaps',
}
export const enum EnumUserLayers {
  CustomMarkers = 'CustomMarkers',
  MyTasks = 'MyTasks',
}
export type TLocation = LatLngLiteral & {
  id: string;
  title: string;
  category?: MarkerCategoryEnum;
  distance?: string;
  description?: string;
  icon?: Icon | null;
};

// for <TileLayer> component
export type TMapLayerType = {
  [key in EnumMapLayers]: {
    name: string;
    url: string;
    attribution?: string;
  };
};

export interface ILocation {
  location: string;
}

export interface TCustomForm {
  control: L.Control;
  data?: ILocation;
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

export type TMapClickType = 'left' | 'right' | 'double';

export interface IMapClickHandlerProps {
  onClick: (coords: LatLngLiteral, clickType: TMapClickType) => void;
  allowClickToAddMarker?: boolean;

  clickOptions?: {
    setMe: (location: LatLngLiteral) => void;
    setMyMarker: (location: LatLngLiteral) => void;
  };

  setClickedCoords?: (latlng: LatLngLiteral) => void;
  setShowOptionsMenu?: (visible: boolean) => void;
  onCloseMenu?: () => void;
}

export type TranslationFunction = (key: string) => string;

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
