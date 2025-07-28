import AnimalMarker from '@/assets/images/map/animal-marker.png';
import DefaultMarker from '@/assets/images/map/default.png';
import FoodMarker from '@/assets/images/map/food-marker.png';
import MedicineMarker from '@/assets/images/map/medicine-marker.png';
import MyPin from '@/assets/images/map/my-pin.png';
import MyPositionMarker from '@/assets/images/map/my-position.png';
import NatureMarker from '@/assets/images/map/nature-marker.png';
import { IExtendedCategoryFilter } from '@/types/filter.type';
import { LeafletType, MapIcons, MarkerCategoryEnum } from '@/types/mapType';
import type { Map as LeafletMap } from 'leaflet';
import { Icon } from 'leaflet';

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
 * Gets the appropriate marker icon based on category from the icons on the map
 * This function checks if all required icons are present and returns the corresponding Leaflet Icon.
 * @param title Marker category
 * @param icons Map icons collection
 * @returns The corresponding Leaflet Icon
 */
export const getMarkerIcon = (
  title: MarkerCategoryEnum,
  icons: MapIcons
): Icon => {
  // Validate all icons exist
  const requiredIconKeys: (keyof MapIcons)[] = [
    'medicine',
    'nature',
    'animal',
    'food',
    'myPosition',
    'default',
  ];

  for (const key of requiredIconKeys) {
    if (!icons[key]) {
      const fallbackKey = 'default';
      const fallbackIcon = icons[fallbackKey];
      if (fallbackIcon) {
        console.warn(
          `Missing icon for category: ${title}. Using fallback icon: ${fallbackKey}`
        );
        return fallbackIcon;
      }
    }
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
/**
 * Resolves the task category based on user selection
 * @param taskCategories
 * @param selectedCategories
 * @param allAvailableCategories
 * @returns The resolved task category based on selected categories (or default if none match) its for nice display in the map when user selects a category
 * If 'all' is selected or no categories are selected, it returns the first task category or a default category.
 * If a matching category is found in taskCategories, it returns that; otherwise, it defaults to the default category.
 */
export function resolveTaskCategory(
  taskCategories: IExtendedCategoryFilter[],
  selectedCategories: IExtendedCategoryFilter[],
  allAvailableCategories: IExtendedCategoryFilter[]
): IExtendedCategoryFilter {
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
}

/**
 * Calculates the visible radius of the map based on its current center and bounds
 * @param map Leaflet map instance
 * @returns The visible radius in meters
 */
export function getVisibleRadius(map: LeafletMap): number {
  const center = map.getCenter();
  const bounds = map.getBounds();
  const north = bounds.getNorth();
  return map.distance(center, { lat: north, lng: center.lng });
}

/**
 * Calculates the distance between two geographical points using the Haversine formula
 * @param lat1 Latitude of the first point
 * @param lng1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lng2 Longitude of the second point
 * @returns Distance in meters
 */
export function calculateDistanceInMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (value: number): number => (value * Math.PI) / 180;
  const R = 6371000; // Earth radius in meters

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Pans the map to a specific latitude and longitude with an offset
 * @param map Leaflet map instance
 * @param lat Latitude to pan to
 * @param lng Longitude to pan to
 * @param offsetY Vertical offset in pixels
 */
export function panToWithOffset(
  map: L.Map,
  lat: number,
  lng: number,
  offsetY: number
) {
  const target = map.project([lat, lng], map.getZoom());
  const offsetTarget = target.subtract([0, offsetY]);
  const finalLatLng = map.unproject(offsetTarget, map.getZoom());

  map.flyTo(finalLatLng, map.getZoom(), { animate: true });
}
