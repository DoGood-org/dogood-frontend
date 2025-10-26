import { lazyImport } from '@/lib/lazyImport';

export const MapClickHandler = lazyImport(
  () => import('@/components/main/map/MapClicks'),
  'MapClickHandler'
);

export const ScrollAfterDelay = lazyImport(
  () => import('@/components/main/map/ScrollAfterDelay'),
  'ScrollAfterDelay'
);

export const StoreMapInstance = lazyImport(
  () => import('@/components/main/map/StoreMapInstance'),
  'StoreMapInstance'
);

export const AutoZoomOnDistanceFilter = lazyImport(
  () => import('@/components/main/map/filters/AutoZoomOnDistanceFilter'),
  'AutoZoomOnDistanceFilter'
);

export const RadiusWatcher = lazyImport(
  () => import('@/components/main/map/RadiusWatcher'),
  'RadiusWatcher'
);

export const AcceptShareLocationPopUp = lazyImport(
  () => import('@/components/main/map/AcceptShareLocationPopUp'),
  'AcceptShareLocationPopUp'
);
