'use client';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { AnimatedModalWrapper } from '@/components/ui/portal/AnimatedModalWrapper';
import Portal from '@/components/ui/portal/Portal';
import { resolveTaskCategory } from '@/lib/mapUtils';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTaskStore } from '@/zustand/stores/taskStore';
import React, { JSX, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  AcceptShareLocationPopUp,
  AutoZoomOnDistanceFilter,
  MapClickHandler,
  RadiusWatcher,
  ScrollAfterDelay,
  StoreMapInstance,
} from './LazyImports';
import { generateTasks } from './mockTasks';
import { UserLocation } from './markers/UserLocation';
import { MultiControlPanel } from './controls/MultiControlPanel';
import { CustomControlContent } from './controls/CustomControlContent';
import { TasksOnMap } from './tasksPanel/TasksOnMap';
import { MapAutoResize } from './profileMap/MapAutoResize';
import { isFilterCategory } from '@/utils/filterCategories';
import { useRouter } from 'next/navigation';

export const Map: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { ref: mapContainerRef, inView: isInView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
    delay: 100,
  });

  const {
    mapIcons,
    leafletComponents,
    activeLayer,
    defaultLayers,
    initMap,
    userLocation,
    setUserLocation,
    defaultLocation,
    declineLocationSharing,
    showGeolocationPopup,
    checkLocationPermission,
    radius,

    clickedCoords,
    showOptionsMenu,
    setClickedCoords,
    setShowOptionsMenu,
    closeOptionsMenu,
  } = useMapStore();
  const { choosenCategories, categories } = useFilterStore();
  const pendingFlyTo = useMapStore((s) => s.pendingFlyTo);
  const setPendingFlyTo = useMapStore((s) => s.setPendingFlyTo);
  const flyToCoords = useMapStore((s) => s.flyToCoords);
  const mainMap = useMapStore((s) => s.mapInstances.main);
  const { tasksByKey, setTasksByKey, highlightedTaskId } = useTaskStore();
  const { setCategories } = useFilterStore();
  const setSkipGeoPrompt = useMapStore((s) => s.setSkipGeoPrompt);

  useEffect(() => {
    initMap('main');
  }, [initMap]);

  useEffect(() => {
    if (!isInView) return;

    if (useMapStore.getState().skipGeoPrompt) {
      setSkipGeoPrompt(false);
      return;
    }

    checkLocationPermission();
  }, [isInView, setSkipGeoPrompt, checkLocationPermission]);

  // Imitate backend data generation
  // This should be replaced with actual data fetching logic
  // For now, we generate tasks based on the user's location

  const baseLocation = userLocation ?? defaultLocation;
  const key = `${radius}:${baseLocation.lat.toFixed(4)}:${baseLocation.lng.toFixed(4)}`;

  useEffect(() => {
    let tasks = tasksByKey[key];
    if (!tasks) {
      tasks = generateTasks(baseLocation.lat, baseLocation.lng, radius);
      setTasksByKey(key, tasks);
    }

    setCategories(
      Array.from(new Set(tasks.flatMap((task) => task.category))).filter((c) =>
        isFilterCategory(c)
      )
    );
  }, [
    baseLocation.lat,
    baseLocation.lng,
    radius,
    key,
    tasksByKey,
    setTasksByKey,
    setCategories,
  ]);

  const { noPaginatedTasks } = useFilteredTasksSelector();
  const highLightedRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!highlightedTaskId || pendingFlyTo) return;
    highLightedRef.current?.openPopup();
  }, [highlightedTaskId, pendingFlyTo]);

  useEffect(() => {
    if (!pendingFlyTo || !mainMap) return;

    const timer = setTimeout(() => {
      const started = flyToCoords(pendingFlyTo, 17, 'main', () =>
        highLightedRef.current?.openPopup()
      );
      if (started) {
        setPendingFlyTo(null);
        setSkipGeoPrompt(false);
      }
    }, 600);

    return (): void => clearTimeout(timer);
  }, [pendingFlyTo, mainMap, flyToCoords, setPendingFlyTo, setSkipGeoPrompt]);

  if (
    !leafletComponents ||
    !mapIcons ||
    !defaultLayers ||
    !activeLayer ||
    Object.values(mapIcons).length === 0 ||
    Object.values(mapIcons).some((icon) => !icon)
  ) {
    return (
      <div className="w-full bg-background">
        <div className="max-w-[1920px] px-[100px] h-[560px] mx-auto flex items-center justify-center text-gray-500">
          Some nice loading animation here...
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = leafletComponents;

  return (
    <div className="w-full relative transition-transform-y overflow-hidden pb-0 lg:h-full lg:pb-20">
      <div className="flex flex-col rounded-[12px] rounded-b-none md:rounded-b-[12px] overflow-hidden bg-card h-[547px] lg:h-[919px]">
        <div
          ref={mapContainerRef}
          className="block overflow-hidden border-background text-foreground rounded-t-[10px] md:rounded-b-[10px] w-full h-full"
        >
          <Portal>
            <AnimatedModalWrapper
              isVisible={showGeolocationPopup}
              onClose={declineLocationSharing}
            >
              <AcceptShareLocationPopUp />
            </AnimatedModalWrapper>
          </Portal>

          <MapContainer
            center={userLocation || defaultLocation}
            style={{ height: '100%', width: '100%' }}
            doubleClickZoom={false}
            className="h-full w-full cursor-default relative"
            zoom={13}
            minZoom={10}
            maxZoom={17}
            zoomControl={false}
            attributionControl={false}
            key="default-location"
            scrollWheelZoom={false}
          >
            <ScrollAfterDelay delay={2000} />
            <StoreMapInstance mapKey="main" />
            <MapAutoResize />
            <UserLocation />
            <RadiusWatcher />
            <AutoZoomOnDistanceFilter />

            <TileLayer
              url={baseLayerConfig[activeLayer].url}
              maxZoom={18}
              minZoom={1}
            />
            {/* Click handler */}
            <MapClickHandler
              onClick={(coords, clickType) => {
                if (clickType === 'right') {
                  setClickedCoords(coords);
                  setShowOptionsMenu(true);
                }
              }}
              allowClickToAddMarker
            />
            {/* Task markers */}
            {noPaginatedTasks.map((task) => {
              if (!task.location) return null;

              const resolvedCategory = resolveTaskCategory(
                task.category,
                choosenCategories,
                categories
              );

              const icon =
                mapIcons[resolvedCategory as keyof typeof mapIcons] ??
                mapIcons.default;

              return (
                <Marker
                  ref={highlightedTaskId === task.id ? highLightedRef : null}
                  key={`task-marker-${task.id}`}
                  position={task.location}
                  icon={icon ?? undefined}
                  title={task.title}
                  zIndexOffset={highlightedTaskId === task.id ? 1000 : 0}
                  autoPanOnFocus={true}
                  riseOnHover={true}
                  riseOffset={100}
                  eventHandlers={{
                    click: () =>
                      console.log('Marker clicked:', task.id, task.title),
                  }}
                >
                  <Popup
                    key={`popup-${task.id}`}
                    autoClose={false}
                    closeButton={true}
                    autoPanPadding={[10, 10]}
                    autoPan
                  >
                    <div className="text-sm max-w-[200px]">
                      <h4 className="font-bold mb-1">{task.title}</h4>
                      <p className="text-xs">{task.subtitle}</p>
                      <p className="text-xs text-muted mt-1">{task.distance}</p>
                      <button
                        className="mt-2 text-violet-500 hover:underline cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/tasks/${task.id}`);
                        }}
                      >
                        GO TO TASK
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
            {/* User location marker */}
            {userLocation && mapIcons.myPosition && (
              <Marker
                position={userLocation}
                icon={mapIcons.myPosition}
                draggable={true}
                title="Drag me to change your location"
                zIndexOffset={10000}
                eventHandlers={{
                  dragend: (event) => {
                    const newCoords = event.target.getLatLng();
                    setUserLocation({
                      lat: newCoords.lat,
                      lng: newCoords.lng,
                    });
                    console.log(
                      'User location updated:',
                      newCoords.lat.toFixed(5),
                      newCoords.lng.toFixed(5)
                    );
                  },
                }}
              >
                <Popup>
                  <div>
                    📍 You are here: <br />
                    But you can drag me to change location! <br />
                    <strong>Coordinates:</strong> <br />
                    <strong>{userLocation.lat.toFixed(5)}</strong>,{' '}
                    <strong>{userLocation.lng.toFixed(5)}</strong>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Options menu for right click */}
            {showOptionsMenu && clickedCoords && (
              <Popup
                key={`${clickedCoords.lat}-${clickedCoords.lng}`}
                position={clickedCoords}
                closeOnClick={true}
                autoPan={true}
                closeButton={true}
                eventHandlers={{
                  remove: () => {
                    setShowOptionsMenu(false);
                    setClickedCoords(null);
                  },
                }}
              >
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserLocation(clickedCoords);
                      closeOptionsMenu();
                    }}
                  >
                    📍 Set My Location
                  </button>
                </div>
              </Popup>
            )}

            {/* Custom controls */}
            <MultiControlPanel
              controls={[
                { position: 'bottomright', element: <CustomControlContent /> },
              ]}
            />
          </MapContainer>
        </div>
      </div>
      <TasksOnMap
        mapHeight={547}
        mapOnMain={true}
        tasks={noPaginatedTasks}
        className="relative z-[1000] w-full mt-0 md:mt-4 lg:mt-0 lg:absolute lg:top-12 lg:left-12 lg:w-[487px]"
      />
    </div>
  );
};

export default Map;
