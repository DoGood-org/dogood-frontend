import DefaultMarker from '@/assets/images/map/default.png';
import MyPin from '@/assets/images/map/my-pin.png';
import MyPositionMarker from '@/assets/images/map/my-position.png';
import { IExtendedCategoryFilter } from '@/types/filter.type';
import {
  LeafletType,
  MapIcon,
  MapIcons,
  MarkerCategoryEnum,
} from '@/types/mapType';
import type { DivIcon, Map as LeafletMap } from 'leaflet';
import { CATEGORIES } from '@/constants/createTask.categories';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { TaskCategoryEnum } from '@/types/createTask.type';

export const createIcon = (
  L: LeafletType,
  src: string
): ReturnType<LeafletType['icon']> => {
  return L.icon({
    iconUrl: src,
    iconSize: [34, 48],
  });
};

const createPinIcon = (
  L: LeafletType,
  cfg: (typeof CATEGORIES)[number]
): ReturnType<LeafletType['divIcon']> => {
  const glyph = renderToStaticMarkup(
    createElement(cfg.icon, { width: 20, height: 20 })
  );
  const isDonation = !!cfg.withWhiteCircle;
  const dropClass = isDonation ? 'bg-white' : cfg.colorClass;
  const glyphColor = isDonation ? '#01425c' : '#fff';

  return L.divIcon({
    className: '',
    iconSize: [48, 48],
    iconAnchor: [24, 41],
    popupAnchor: [0, -41],
    html: `
      <div style="position:relative;width:48px;height:48px;filter:drop-shadow(5px 9px 7px rgba(0,0,0,.35))">
        <div class="${dropClass}"
          style="position:absolute;left:7px;top:0;width:34px;height:34px;
                 border-radius:50% 50% 50% 0;transform:rotate(-45deg)"></div>
        <div style="position:absolute;left:14px;top:7px;width:20px;height:20px;color:${glyphColor}">
          ${glyph}
        </div>
      </div>`,
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

export const initializeMapIcons = (L: LeafletType): MapIcons => {
  const byId = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, createPinIcon(L, c)])
  ) as Record<TaskCategoryEnum, DivIcon>;

  return {
    medicine: byId[TaskCategoryEnum.Medicine],
    nature: byId[TaskCategoryEnum.Nature],
    animal: byId[TaskCategoryEnum.Animal],
    food: byId[TaskCategoryEnum.Food],
    donation: byId[TaskCategoryEnum.Donation],
    myPosition: createIcon(L, MyPositionMarker.src),
    default: createIcon(L, DefaultMarker.src),
    myPin: createIcon(L, MyPin.src),
  };
};

export const getMarkerIcon = (
  title: MarkerCategoryEnum,
  icons: MapIcons
): MapIcon => {
  const requiredIconKeys: (keyof MapIcons)[] = [
    'medicine',
    'nature',
    'animal',
    'food',
    'myPosition',
    'donation',
    'default',
  ];

  for (const key of requiredIconKeys) {
    if (!icons[key]) {
      const fallbackIcon = icons.default;
      if (fallbackIcon) {
        console.warn(
          `Missing icon for category: ${title}. Using fallback icon: default`
        );
        return fallbackIcon;
      }
    }
  }

  const iconMap: { [key in MarkerCategoryEnum]: MapIcon } = {
    [MarkerCategoryEnum.Medicine]: icons.medicine!,
    [MarkerCategoryEnum.Nature]: icons.nature!,
    [MarkerCategoryEnum.Animal]: icons.animal!,
    [MarkerCategoryEnum.Food]: icons.food!,
    [MarkerCategoryEnum.MyPosition]: icons.myPosition!,
    [MarkerCategoryEnum.Default]: icons.default!,
    [MarkerCategoryEnum.MyPin]: icons.myPin!,
    [MarkerCategoryEnum.Donation]: icons.donation!,
  };

  return iconMap[title];
};

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

export function getVisibleRadius(map: LeafletMap): number {
  const center = map.getCenter();
  const bounds = map.getBounds();
  const north = bounds.getNorth();
  return map.distance(center, { lat: north, lng: center.lng });
}

export function calculateDistanceInMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (value: number): number => (value * Math.PI) / 180;
  const R = 6371000;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
