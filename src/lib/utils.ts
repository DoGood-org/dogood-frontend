import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MedicineSvg from '@/components/icons/Medicine';
import NatureSvg from '@/components/icons/Nature';
import AnimalSvg from '@/components/icons/Animal';
import FoodSvg from '@/components/icons/Food';
import MedicineMarker from '@/assets/images/map/medicine-marker.png';
import NatureMarker from '@/assets/images/map/nature-marker.png';
import AnimalMarker from '@/assets/images/map/animal-marker.png';
import FoodMarker from '@/assets/images/map/food-marker.png';
import MyPositionMarker from '@/assets/images/map/my-position.png';
import NotePencil from '@/components/icons/NotePencil';
import Binoculars from '@/components/icons/Binoculars';
import HandHeart from '@/components/icons/HandHeart';

import {
  CategoryItem,
  DistanceItem,
  IconData,
  LeafletType,
  MapIcons,
  MarkerCategory,
  TranslationFunction,
} from '@/types/mapType';
import { iconMap } from '@/components';
import { Icon, LatLngLiteral } from 'leaflet';
import { IHowItWorksItem } from '@/types/howItWorksItem';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getCategoryList = (t: TranslationFunction): CategoryItem[] => [
  { icon: MedicineSvg, title: t('medicineBtn') },
  { icon: NatureSvg, title: t('natureBtn') },
  { icon: AnimalSvg, title: t('animalBtn') },
  { icon: FoodSvg, title: t('foodBtn') },
];

export const getDistancesList = (t: TranslationFunction): DistanceItem[] => [
  { title: t('1km') },
  { title: t('3km') },
  { title: t('5km') },
  { title: t('10km') },
  { title: t('neutroBtn') },
];

export const getCategoryIcon = (category: keyof typeof iconMap): IconData => {
  return iconMap[category];
};

export const getHowItWorks = (t: TranslationFunction): IHowItWorksItem[] => [
  { icon: NotePencil, title: t('block1') },
  { icon: Binoculars, title: t('block2') },
  { icon: HandHeart, title: t('block3') },
];
//---------------------------map utils-------------------------------------------
/**
 * Creates a custom Leaflet icon
 * @param L Leaflet module
 * @param src Path to the icon image
 * @returns Leaflet Icon instance
 */
export const createIcon = (
  L: LeafletType,
  src: string
): ReturnType<LeafletType['icon']> => {
  return L.icon({
    iconUrl: src,
    iconSize: [30, 35],
  });
};

/**
 * Initializes all map icons used in the application
 * @param L Leaflet module
 * @returns Object containing all initialized icons
 */
export const initializeMapIcons = (L: LeafletType): MapIcons => {
  return {
    medicineIcon: createIcon(L, MedicineMarker.src),
    natureIcon: createIcon(L, NatureMarker.src),
    animalIcon: createIcon(L, AnimalMarker.src),
    foodIcon: createIcon(L, FoodMarker.src),
    myPositionIcon: createIcon(L, MyPositionMarker.src),
  };
};

/**
 * Gets the appropriate marker icon based on category
 * @param title Marker category
 * @param icons Map icons collection
 * @returns The corresponding Leaflet Icon
 */
export const getMarkerIcon = (title: MarkerCategory, icons: MapIcons): Icon => {
  // Validate all icons exist
  const requiredIcons = [
    icons.medicineIcon,
    icons.natureIcon,
    icons.animalIcon,
    icons.foodIcon,
    icons.myPositionIcon,
  ];

  if (requiredIcons.some((icon) => !icon)) {
    throw new Error('Not all icons are loaded');
  }

  const iconMap: { [key in MarkerCategory]: Icon } = {
    Medicine: icons.medicineIcon!,
    Nature: icons.natureIcon!,
    Animal: icons.animalIcon!,
    Food: icons.foodIcon!,
    myPosition: icons.myPositionIcon!,
  };

  return iconMap[title];
};
/**
 * Checks if a marker already exists at given coordinates
 * @param markers Array of existing markers
 * @param newLatlng Coordinates to check
 * @param tolerance Tolerance for coordinate comparison (in degrees)
 * @returns Boolean indicating whether a marker exists at the coordinates
 */
export const isMarkerExists = (
  markers: LatLngLiteral[],
  newLatlng: LatLngLiteral,
  tolerance = 0.0001
): boolean => {
  return markers.some(
    (marker) =>
      Math.abs(marker.lat - newLatlng.lat) < tolerance &&
      Math.abs(marker.lng - newLatlng.lng) < tolerance
  );
};

/**
 * Gets the user's current geolocation
 * @returns Promise that resolves with the coordinates or rejects with an error
 */
export const getUserGeolocation = (): Promise<LatLngLiteral> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error: GeolocationPositionError) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

/**
 * Utility function to remove a marker at specific coordinates
 * @param markers Array of existing markers
 * @param latlng Coordinates to remove
 * @param tolerance Tolerance for coordinate comparison
 * @returns New array with the marker removed
 */
export const removeMarker = (
  markers: LatLngLiteral[],
  latlng: LatLngLiteral,
  tolerance = 0.0001
): LatLngLiteral[] => {
  return markers.filter(
    (marker) =>
      Math.abs(marker.lat - latlng.lat) >= tolerance ||
      Math.abs(marker.lng - latlng.lng) >= tolerance
  );
};
