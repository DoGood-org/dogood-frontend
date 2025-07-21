'use client';
import { motion } from 'framer-motion';
import { AcceptShareLocationPopUp } from '@/components/main/map/AcceptShareLocationPopUp';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { MapClickHandler } from '@/components/main/map/MapClicks';
import { MapAutoResize } from '@/components/main/map/profileMap/MapAutoResize';
import { ProfileCustomControlContent } from '@/components/main/map/profileMap/ProfileCustomControlContent';
import { ProfileMultiControlPanel } from '@/components/main/map/profileMap/ProfileMultiControlPanel';
import { ResponsiveMapWrpr } from '@/components/main/map/profileMap/ResponsiveMapWrpr';
import { RadiusWatcher } from '@/components/main/map/RadiusWatcher';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';
import { StoreMapInstance } from '@/components/main/map/StoreMapInstance';
import { ButtonOpenTasks } from '@/components/main/map/tasksPanel/ButtonOpenTasks';
import { UserLocation } from '@/components/main/map/UserLocation';
import { AnimatedDrawler } from '@/components/ui/AnimatedDrawler';
import { AnimatedModalWrapper } from '@/components/ui/portal/AnimatedModalWrapper';
import Portal from '@/components/ui/portal/Portal';
import { getMarkerIcon, resolveTaskCategory } from '@/lib/mapUtils';
import { MarkerCategoryEnum } from '@/types/mapType';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AnimatePresence } from 'framer-motion';
import { JSX, useEffect } from 'react';
import { Filters } from '@/components/main/map/filters/Filters';
import { TasksList } from '@/components/main/map/tasksPanel/TasksList';

export const ProfileMap = (): JSX.Element => {
  const {
    initMap,
    leafletComponents,
    mapIcons,
    activeLayer,
    setClickedCoords,
    setShowOptionsMenu,
    setUserLocation,
    showGeolocationPopup,
    declineLocationSharing,
    addMarker,
    customMarkers,
    userLocation,
    fullscreenMap,
    defaultLocation,
    taskListIsOpen,
    toggleTaskList,
    activePanel,
    setActivePanel,
    searchIsActive,
    // selectedTask,
    setCustomMarkers,
    closeOptionsMenu,
    checkLocationPermission,
    clickedCoords,
    showOptionsMenu,
  } = useMapStore();

  const { choosenCategories, categories } = useFilterStore();

  useEffect(() => {
    initMap('user');
    const run = async (): Promise<void> => {
      checkLocationPermission();
    };
    run();
  }, []);

  const { noPaginatedTasks } = useFilteredTasksSelector();

  if (
    !leafletComponents ||
    !mapIcons ||
    Object.values(mapIcons).some((icon) => !icon)
  ) {
    return <div>Loading map...</div>;
  }
  const { MapContainer, TileLayer, Marker, Popup } = leafletComponents;

  const renderCustomMarkers = (): JSX.Element[] => {
    return customMarkers.map((marker, index) => {
      const icon = getMarkerIcon(MarkerCategoryEnum.Default, mapIcons);
      return (
        <Marker
          key={`custom-marker-${index}`}
          draggable={true}
          zIndexOffset={10000}
          title="Drag me to change location"
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={icon}
          eventHandlers={{
            click: () => {
              console.log('Custom marker clicked:', marker);
            },
            dragend: (e) => {
              const newPosition = e.target.getLatLng();
              console.log('Custom marker dragged to:', newPosition);
              setCustomMarkers(
                customMarkers.map((m) =>
                  m.id === marker.id
                    ? { ...m, lat: newPosition.lat, lng: newPosition.lng }
                    : m
                )
              );
            },
            remove: () => {
              setCustomMarkers(customMarkers.filter((m) => m !== marker));

              console.log('Custom marker removed:', marker);
            },
          }}
        >
          <Popup>
            <div className="flex flex-col gap-2 text-sm">
              📍{marker.title}
              <br />
              {marker.description}
              <br />
              Lat: {marker.lat.toFixed(5)}, Lng: {marker.lng.toFixed(5)}
              <div className="flex gap-2 mt-2">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    console.log('Edit marker:', marker);
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setCustomMarkers(customMarkers.filter((m) => m !== marker));
                  }}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      );
    });
  };

  const handleMarkerClick = (task: any): void => {
    console.log('Task marker clicked:', task);
  };

  return (
    <AnimatePresence mode="wait">
      <ResponsiveMapWrpr key={fullscreenMap ? 'fullscreen' : 'default'}>
        <div className="w-full h-full relative">
          <Portal>
            <AnimatedModalWrapper
              isVisible={showGeolocationPopup}
              onClose={declineLocationSharing}
            >
              <AcceptShareLocationPopUp />
            </AnimatedModalWrapper>
          </Portal>
          <MapContainer
            zoom={16}
            style={{ height: '100%', width: '100%' }}
            center={userLocation || defaultLocation}
            zoomControl={false}
            attributionControl={false}
            doubleClickZoom={false}
          >
            <StoreMapInstance mapKey="user" />
            <MapAutoResize />
            <ScrollAfterDelay delay={2000} />
            <UserLocation />
            <RadiusWatcher />
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
            {renderCustomMarkers()}
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
            {userLocation && mapIcons.myPosition && (
              <Marker
                position={userLocation}
                draggable={true}
                zIndexOffset={10000}
                title="Drag me to change your location"
                icon={mapIcons.myPosition}
                eventHandlers={{
                  dragend: (e) => {
                    const newPosition = e.target.getLatLng();
                    setUserLocation(newPosition);
                    console.log(
                      'User location marker dragged to:',
                      newPosition
                    );
                  },
                }}
              >
                <Popup>
                  <div className="text-sm text-foreground">
                    📍 You are here: <br />
                    But you can drag me to change location! <br />
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
                <div className="flex flex-col gap-2 items-start justify-start">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserLocation(clickedCoords);

                      closeOptionsMenu();
                    }}
                  >
                    📍 Set My Location
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addMarker({
                        ...clickedCoords,
                        id: `${clickedCoords.lat}-${clickedCoords.lng}-${Date.now()}`,
                        title: 'My Task',
                        description: 'I added this task here',
                        category: MarkerCategoryEnum.MyPin,
                      });
                      closeOptionsMenu();
                    }}
                  >
                    ➕ Add My Task Here
                  </button>
                </div>
              </Popup>
            )}
            <ProfileMultiControlPanel
              controls={[
                {
                  position: 'bottomright',
                  element: <ProfileCustomControlContent />,
                },
              ]}
            />
          </MapContainer>
          <div className="absolute flex items-start top-2 left-2 gap-10 z-[500]">
            <div className="flex flex-col justify-center relative bg-card w-[180px] rounded-sm">
              <FormSearch
                className="p-0 bg-card border-b border-b-foreground"
                inputClassName="h-10 pl-7 pr-14 overflow-hidden"
                leftSVGClassName="left-0"
                rightSVGClassName="right-0"
              />
              <ButtonOpenTasks
                onClick={() => toggleTaskList()}
                isOpen={taskListIsOpen}
                className="mx-auto bg-card h-10 lg:mb-0 lg:absolute lg:z-50  lg:h-10 lg:top-12 lg:border-t lg:border-t-foreground  lg:w-full  lg:hover:border-t-foreground"
              />
            </div>
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
             flex flex-col bg-card z-[1000]
             absolute
             top-20 left-2 w-[180px] h-full
           `}
          >
            <AnimatePresence mode="wait">
              {activePanel === 'filters' && (
                <motion.div
                  className="w-full h-full top-10"
                  key="filters"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Filters
                    tasks={noPaginatedTasks}
                    className="w-full bg-card z-[1000]"
                  />
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
      </ResponsiveMapWrpr>
    </AnimatePresence>
  );
};
