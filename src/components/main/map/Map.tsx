'use client';
import {
  Container,
  CustomControlContent,
  generateTasks,
  MultiControlPanel,
  TasksOnMap,
  UserLocation,
} from '@/components';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { MapClickHandler } from '@/components/main/map/MapClicks';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';
import { StoreMapInstance } from '@/components/main/map/StoreMapInstance';
import { AnimatedModalWrapper } from '@/components/ui/portal/AnimatedModalWrapper';
import Portal from '@/components/ui/portal/Portal';
import { resolveTaskCategory } from '@/lib/mapUtils';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTaskStore } from '@/zustand/stores/taskStore';
import React, { JSX, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { AcceptShareLocationPopUp } from './AcceptShareLocationPopUp';
import { AutoZoomOnDistanceFilter } from '@/components/main/map/filters/AutoZoomOnDistanceFilter';
import { RadiusWatcher } from '@/components/main/map/RadiusWatcher';
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
    activePanel,

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
  const { tasksByKey, setTasksByKey, highlightedTaskId } = useTaskStore();
  const { setCategories } = useFilterStore();

  useEffect(() => {
    initMap('main');
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const run = async (): Promise<void> => {
      checkLocationPermission();
    };
    run();
  }, [isInView]);

  // Imitate backend data generation
  // This should be replaced with actual data fetching logic
  // For now, we generate tasks based on the user's location

  const key = userLocation
    ? `${radius}:${userLocation.lat.toFixed(4)}:${userLocation.lng.toFixed(4)}`
    : `${radius}:unknown:unknown`;

  useEffect(() => {
    if (!userLocation) return;
    if (tasksByKey[key]) return;

    const newTasks = generateTasks(userLocation.lat, userLocation.lng, radius);
    setTasksByKey(key, newTasks);
    const categories = Array.from(
      new Set(newTasks.flatMap((task) => task.category))
    );
    setCategories(categories);
  }, [userLocation, radius]);

  const { noPaginatedTasks } = useFilteredTasksSelector();
  const highLightedRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (highlightedTaskId && highLightedRef.current) {
      highLightedRef.current.openPopup();
    }
  }, [highlightedTaskId]);

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
    <Container
      className={`w-full h-full relative ${activePanel ? 'pb-35' : 'pb-20'}`}
    >
      <div className="flex flex-col rounded-[12px] overflow-hidden bg-card h-[547px] lg:h-[919px]">
        <div
          ref={mapContainerRef}
          className="block overflow-hidden border-background text-foreground rounded-t-[10px] w-full h-full "
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
                  position={{ lat: task.lat, lng: task.lng }}
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
                    position={{ lat: task.lat, lng: task.lng }}
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
        className="absolute z-[1000] w-[calc(100%-40px)] md:w-[calc(100%-120px)] lg:w-[487px] lg:top-16 lg:left-24"
      />
    </Container>
  );
};

export default Map;
