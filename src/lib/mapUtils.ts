import { LeafletType, MapIcons, MarkerCategoryEnum } from '@/types/mapType';
import MedicineMarker from '@/assets/images/map/medicine-marker.png';
import NatureMarker from '@/assets/images/map/nature-marker.png';
import AnimalMarker from '@/assets/images/map/animal-marker.png';
import FoodMarker from '@/assets/images/map/food-marker.png';
import MyPositionMarker from '@/assets/images/map/my-position.png';
import DefaultMarker from '@/assets/images/map/default.png';
import { Icon, LatLngLiteral } from 'leaflet';

export const createIcon = (
  L: LeafletType,
  src: string
): ReturnType<LeafletType['icon']> => {
  return L.icon({
    iconUrl: src,
    iconSize: [35,45],
  });
};

export const initializeMapIcons = (L: LeafletType): MapIcons => {
  return {
    medicineIcon: createIcon(L, MedicineMarker.src),
    natureIcon: createIcon(L, NatureMarker.src),
    animalIcon: createIcon(L, AnimalMarker.src),
    foodIcon: createIcon(L, FoodMarker.src),
    myPositionIcon: createIcon(L, MyPositionMarker.src),
    defaultIcon: createIcon(L, DefaultMarker.src),
  };
};

/**
 * Gets the appropriate marker icon based on category
 * @param title Marker category
 * @param icons Map icons collection
 * @returns The corresponding Leaflet Icon
 */
export const getMarkerIcon = (
  title: MarkerCategoryEnum,
  icons: MapIcons
): Icon => {
  // Validate all icons exist
  const requiredIcons = [
    icons.medicineIcon,
    icons.natureIcon,
    icons.animalIcon,
    icons.foodIcon,
    icons.myPositionIcon,
    icons.defaultIcon,
  ];

  if (requiredIcons.some((icon) => !icon)) {
    const missingIcons = requiredIcons
      .map((icon, index) => (icon ? null : Object.keys(icons)[index]))
      .filter(Boolean)
      .join(', ');
    throw new Error(`Missing icons: ${missingIcons}`);
  }

  const iconMap: { [key in MarkerCategoryEnum]: Icon } = {
    [MarkerCategoryEnum.Medicine]: icons.medicineIcon!,
    [MarkerCategoryEnum.Nature]: icons.natureIcon!,
    [MarkerCategoryEnum.Animal]: icons.animalIcon!,
    [MarkerCategoryEnum.Food]: icons.foodIcon!,
    [MarkerCategoryEnum.MyPosition]: icons.myPositionIcon!,
    [MarkerCategoryEnum.Default]: icons.natureIcon!,
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
