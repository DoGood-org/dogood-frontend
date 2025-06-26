import { LeafletType, MapIcons, MarkerCategory } from '@/types/mapType';
import MedicineMarker from '@/assets/images/map/medicine-marker.png';
import NatureMarker from '@/assets/images/map/nature-marker.png';
import AnimalMarker from '@/assets/images/map/animal-marker.png';
import FoodMarker from '@/assets/images/map/food-marker.png';
import MyPositionMarker from '@/assets/images/map/my-position.png';
import { Icon } from 'leaflet';

export const createIcon = (
  L: LeafletType,
  src: string
): ReturnType<LeafletType['icon']> => {
  return L.icon({
    iconUrl: src,
    iconSize: [30, 35],
  });
};

export const initializeMapIcons = (L: LeafletType): MapIcons => {
  return {
    medicineIcon: createIcon(L, MedicineMarker.src),
    natureIcon: createIcon(L, NatureMarker.src),
    animalIcon: createIcon(L, AnimalMarker.src),
    foodIcon: createIcon(L, FoodMarker.src),
    myPositionIcon: createIcon(L, MyPositionMarker.src),
  };
};

export const getMarkerIcon = (title: MarkerCategory, icons: MapIcons): Icon => {
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
