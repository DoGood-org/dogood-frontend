'use client';
import {
  AnimatedDrawler,
  ButtonOpenTasks,
  Container,
  CustomControlContent,
  Filters,
  generateTasks,
  MultiControlPanel,
  TasksList,
  UserLocation,
} from '@/components';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { FilterBadges } from '@/components/main/map/filters/FilterBadges';
import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { MapClickHandler } from '@/components/main/map/MapClicks';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';
import { StoreMapInstance } from '@/components/main/map/StoreMapInstance';
import { AnimatedModalWrapper } from '@/components/portal/AnimatedModalWrapper';
import Portal from '@/components/portal/Portal';
import { resolveTaskCategory } from '@/lib/mapUtils';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { AnimatePresence, motion } from 'framer-motion';
import React, { JSX, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { AcceptShareLocationPopUp } from './AcceptShareLocationPopUp';
import { Radius } from '@/components/main/map/Radius';
import { RadiusWatcher } from '@/components/main/map/RadiusWatcher';

export const Map: React.FC = (): JSX.Element => {
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
    acceptLocationSharing,
    declineLocationSharing,
    showGeolocationPopup,
    checkLocationPermission,
    offerPinLocation,
    radius,
    addMarker,
    taskListIsOpen,
    toggleTaskList,
    activePanel,
    setActivePanel,
    clickedCoords,
    showOptionsMenu,
    setClickedCoords,
    setShowOptionsMenu,
    closeOptionsMenu,
    searchIsActive,
  } = useMapStore();
  const { choosenCategories, categories } = useFilterStore();
  const { tasks, setTasks } = useTaskStore();
  const { setCategories } = useFilterStore();

  useEffect(() => {
    initMap('main');
  }, []);
  useEffect((): void => {
    if (isInView) {
      checkLocationPermission();
    }
  }, [isInView, checkLocationPermission]);
  // Imitate backend data generation
  // This should be replaced with actual data fetching logic
  // For now, we generate tasks based on the user's location

  useEffect(() => {
    if (!userLocation || radius === 0) return;

    const newTasks = generateTasks(userLocation.lat, userLocation.lng, radius);
    const oldTasks = tasks;
    const existingTaskIds = Array.from(
      new Set(oldTasks.map((task) => task.id))
    );
    const updatedTasks = [
      ...oldTasks,
      ...newTasks.filter((task) => !existingTaskIds.includes(task.id)),
    ];

    setTasks(updatedTasks);

    const categories = Array.from(
      new Set(updatedTasks.flatMap((task) => task.category))
    );
    setCategories(categories);
  }, [userLocation, radius]);

  const { noPaginatedTasks } = useFilteredTasksSelector();

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

  const { MapContainer, TileLayer, Marker, Popup, Tooltip } = leafletComponents;

  const handleMarkerClick = (task: any): void => {
    console.log('Task marker clicked:', task);
  };

  return (
    <Container className="flex flex-col">
      <div className="relative flex flex-col rounded-[12px] overflow-hidden bg-card ">
        <div
          ref={mapContainerRef}
          className="block overflow-hidden border-background text-foreground rounded-t-[10px] h-[547px] lg:h-[919px]"
        >
          <Portal>
            <AnimatedModalWrapper
              isVisible={showGeolocationPopup}
              onClose={declineLocationSharing}
            >
              <AcceptShareLocationPopUp
                requestGeolocation={acceptLocationSharing}
                declineGeolocation={declineLocationSharing}
              />
            </AnimatedModalWrapper>
          </Portal>

          <MapContainer
            center={userLocation || { lat: 48.8566, lng: 2.3522 }}
            style={{ height: '100%', width: '100%' }}
            doubleClickZoom={false}
            className="h-full w-full cursor-default relative"
            zoom={14}
            minZoom={1}
            zoomControl={false}
            attributionControl={false}
            key="default-location"
            scrollWheelZoom={false}
          >
            <ScrollAfterDelay delay={2000} />
            <StoreMapInstance mapKey="main" />
            <UserLocation />
            <Radius />
            <RadiusWatcher />
            <TileLayer
              url={baseLayerConfig[activeLayer].url}
              maxZoom={18}
              minZoom={1}
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
                  key={`task-marker-${task.id}`}
                  position={{ lat: task.lat, lng: task.lng }}
                  icon={icon === null ? undefined : icon}
                  eventHandlers={{
                    click: () => handleMarkerClick(task),
                  }}
                >
                  <Popup>
                    <div className="text-sm max-w-[200px]">
                      <h4 className="font-bold mb-1">{task.title}</h4>
                      <p className="text-xs">{task.subtitle}</p>
                      <p className="text-xs text-muted mt-1">{task.distance}</p>
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
                eventHandlers={{
                  dragend: (event) => {
                    const newCoords = event.target.getLatLng();
                    setUserLocation({
                      lat: newCoords.lat,
                      lng: newCoords.lng,
                    });
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
                {Tooltip && (
                  <Tooltip permanent direction="top">
                    Im here! You can drag me.
                  </Tooltip>
                )}
              </Marker>
            )}
            {/* Click handler */}
            <MapClickHandler
              allowClickToAddMarker
              onClick={(coords, clickType) => {
                if (clickType === 'right') {
                  setClickedCoords(coords);
                  setShowOptionsMenu(true);
                }
                if (clickType === 'left') {
                  closeOptionsMenu();
                }
              }}
              clickOptions={{
                setMe: (coords) => setUserLocation(coords),
                setMyMarker: (coords) => addMarker(coords),
              }}
            />
            {/* Options menu for right click */}
            {showOptionsMenu && clickedCoords && (
              <Popup
                position={clickedCoords}
                eventHandlers={{ remove: closeOptionsMenu }}
                closeOnClick={false}
                autoPan={false}
              >
                <div>
                  <button
                    onClick={() => {
                      setUserLocation(clickedCoords);
                      closeOptionsMenu();
                    }}
                  >
                    📍 Set My Location
                  </button>
                </div>
              </Popup>
            )}
            {/* Custom draggable pin for setting location  on location button click*/}
            {offerPinLocation && mapIcons.myPosition && (
              <Marker
                position={{ lat: 48.8566, lng: 2.3522 }}
                icon={mapIcons.myPosition}
                zIndexOffset={10000}
                eventHandlers={{
                  dragend: (event) => {
                    const newCoords = event.target.getLatLng();
                    setClickedCoords({
                      lat: newCoords.lat,
                      lng: newCoords.lng,
                    });
                  },
                }}
              >
                <Popup>
                  <div>
                    📍 Set My Location: <br />
                    Im draggable pin!
                  </div>
                </Popup>
              </Marker>
            )}
            {/* Custom controls */}
            <MultiControlPanel
              controls={[
                { position: 'bottomright', element: <CustomControlContent /> },
              ]}
            />
          </MapContainer>
        </div>
        <div className="lg:absolute lg:flex lg:items-start lg:top-12 lg:left-32 lg:gap-10 lg:z-[500]">
          <div className="flex flex-col justify-center relative w-full bg-card lg:w-[485px]">
            <ButtonOpenTasks
              onClick={() => toggleTaskList()}
              isOpen={taskListIsOpen}
              className="mx-auto mb-2 bg-card lg:mb-0 lg:absolute lg:z-50  lg:h-10 lg:top-12 lg:border-t lg:border-t-foreground  lg:w-full  lg:hover:border-t-foreground"
            />
            <FormSearch />
          </div>
          <FilterBadges />
        </div>

        <AnimatedDrawler
          isVisible={!!activePanel}
          onClose={() => {
            if (!searchIsActive) setActivePanel(null);
          }}
          exeptionForClickOutside={searchIsActive}
          exeptionSelector="search"
          direction="vertical"
          className={`
            relative flex flex-col bg-card z-[1000]
            w-full h-[675px] lg:mt-0
            lg:absolute lg:top-32 lg:left-32 lg:w-[485px] lg:h-[722px] lg:rounded-md  overflow-y-hidden
          `}
        >
          <AnimatePresence mode="wait">
            {activePanel === 'filters' && (
              <motion.div
                key="filters"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Filters tasks={noPaginatedTasks} />
              </motion.div>
            )}

            {activePanel === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TasksList />
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedDrawler>
      </div>
    </Container>
  );
};

export default Map;
