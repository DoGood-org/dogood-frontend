import {
  EnumMapLayers,
  IExtendedCategoryFilter,
  LeafletType,
  MapIcons,
  MarkerCategoryEnum,
} from '@/types/mapType';
import MedicineMarker from '@/assets/images/map/medicine-marker.png';
import NatureMarker from '@/assets/images/map/nature-marker.png';
import AnimalMarker from '@/assets/images/map/animal-marker.png';
import FoodMarker from '@/assets/images/map/food-marker.png';
import MyPositionMarker from '@/assets/images/map/my-position.png';
import DefaultMarker from '@/assets/images/map/default.png';
import MyPin from '@/assets/images/map/my-pin.png';
import { Icon, TileLayer } from 'leaflet';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';

/**
 * Creates a Leaflet icon instance
 * @param L Leaflet library instance
 * @param src Icon image source
 * @returns Leaflet Icon instance
 */
export const createIcon = (
  L: LeafletType,
  src: string
): ReturnType<LeafletType['icon']> => {
  return L.icon({
    iconUrl: src,
    iconSize: [35, 45],
  });
};

export const createLayer = (
  L: LeafletType,
  baseLayerUrl: string
): ReturnType<LeafletType['tileLayer']> => {
  return L.tileLayer(baseLayerUrl, {
    maxZoom: 18,
    minZoom: 1,
  });
};

/**
 * Initializes map icons for different categories
 * @param L Leaflet library instance
 * @returns An object containing all map icons
 */
export const initializeMapIcons = (L: LeafletType): MapIcons => {
  return {
    medicine: createIcon(L, MedicineMarker.src),
    nature: createIcon(L, NatureMarker.src),
    animal: createIcon(L, AnimalMarker.src),
    food: createIcon(L, FoodMarker.src),
    myPosition: createIcon(L, MyPositionMarker.src),
    default: createIcon(L, DefaultMarker.src),
    myPin: createIcon(L, MyPin.src),
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
    icons.medicine,
    icons.nature,
    icons.animal,
    icons.food,
    icons.myPosition,
    icons.default,
  ];

  if (requiredIcons.some((icon) => !icon)) {
    const missingIcons = requiredIcons
      .map((icon, index) => (icon ? null : Object.keys(icons)[index]))
      .filter(Boolean)
      .join(', ');
    throw new Error(`Missing icons: ${missingIcons}`);
  }

  const iconMap: { [key in MarkerCategoryEnum]: Icon } = {
    [MarkerCategoryEnum.Medicine]: icons.medicine!,
    [MarkerCategoryEnum.Nature]: icons.nature!,
    [MarkerCategoryEnum.Animal]: icons.animal!,
    [MarkerCategoryEnum.Food]: icons.food!,
    [MarkerCategoryEnum.MyPosition]: icons.myPosition!,
    [MarkerCategoryEnum.Default]: icons.default!,
    [MarkerCategoryEnum.MyPin]: icons.myPin!,
  };

  return iconMap[title];
};

export const resolveTaskCategory = (
  taskCategories: IExtendedCategoryFilter[],
  selectedCategories: IExtendedCategoryFilter[],
  allAvailableCategories: IExtendedCategoryFilter[]
): IExtendedCategoryFilter => {
  const isAll =
    selectedCategories.includes('all' as IExtendedCategoryFilter) ||
    selectedCategories.length === 0 ||
    selectedCategories.length === allAvailableCategories.length;

  if (isAll) {
    return taskCategories?.[0] || MarkerCategoryEnum.Default;
  }

  return (
    taskCategories.find((cat) => selectedCategories.includes(cat)) ||
    MarkerCategoryEnum.Default
  );
};
