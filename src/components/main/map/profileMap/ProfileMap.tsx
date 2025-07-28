'use client';
import { AcceptShareLocationPopUp } from '@/components/main/map/AcceptShareLocationPopUp';
import baseLayerConfig from '@/components/main/map/config/baseLayerConfig';
import { MapClickHandler } from '@/components/main/map/MapClicks';
import { MapAutoResize } from '@/components/main/map/profileMap/MapAutoResize';
import { ProfileCustomControlContent } from '@/components/main/map/profileMap/ProfileCustomControlContent';
import { ProfileMultiControlPanel } from '@/components/main/map/profileMap/ProfileMultiControlPanel';
import { ResponsiveMapWrpr } from '@/components/main/map/profileMap/ResponsiveMapWrpr';
import { RadiusWatcher } from '@/components/main/map/RadiusWatcher';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';
import { StoreMapInstance } from '@/components/main/map/StoreMapInstance';

import { UserLocation } from '@/components/main/map/UserLocation';
import { AnimatedModalWrapper } from '@/components/ui/portal/AnimatedModalWrapper';
import Portal from '@/components/ui/portal/Portal';
import { getMarkerIcon, resolveTaskCategory } from '@/lib/mapUtils';
import { MarkerCategoryEnum } from '@/types/mapType';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AnimatePresence } from 'framer-motion';
import { JSX, useEffect, useRef, useState } from 'react';

import { TasksOnMap } from '@/components/main/map/tasksPanel/TasksOnMap';
import { useTaskStore } from '@/zustand/stores/taskStore';

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
    flyToCoords,

    // selectedTask,
    setCustomMarkers,
    closeOptionsMenu,
    checkLocationPermission,
    clickedCoords,
    showOptionsMenu,
  } = useMapStore();

  useEffect(() => {
    initMap('user');
    const run = async (): Promise<void> => {
      checkLocationPermission();
      console.log('ProfileMap initialized');
    };
    run();
  }, []);

  const { noPaginatedTasks } = useFilteredTasksSelector();
  const { choosenCategories, categories } = useFilterStore();
  const { highlightedTaskId } = useTaskStore();

  const markerRefs = useRef(new Map<string, L.Marker>());

  useEffect(() => {
    if (!highlightedTaskId) {
      console.warn('No highlighted task ID set');
      return;
    }

    const marker = markerRefs.current.get(highlightedTaskId);
    if (!marker) {
      console.warn('Marker not found for ID:', highlightedTaskId);
      return;
    }
    console.log(marker);
    flyToCoords(marker.getLatLng(), 15);

    marker.openPopup();
    marker.isPopupOpen();

    // Open popup
    marker.openPopup();
    marker.getPopup()?.setLatLng(marker.getLatLng());
  }, [highlightedTaskId]);

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
          ref={(ref) => {
            if (ref) markerRefs.current.set(marker.id, ref);
          }}
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

  return (
    <div className="profile-map-wrapper w-full h-full relative">
      <AnimatePresence mode="wait">
        <ResponsiveMapWrpr key={fullscreenMap ? 'fullscreen' : 'default'}>
          <div className="w-full h-full">
            <Portal>
              <AnimatedModalWrapper
                isVisible={showGeolocationPopup}
                onClose={declineLocationSharing}
              >
                <AcceptShareLocationPopUp />
              </AnimatedModalWrapper>
            </Portal>
            <MapContainer
              zoom={15}
              minZoom={10}
              maxZoom={17}
              style={{ height: '100%', width: '100%' }}
              center={
                highlightedTaskId
                  ? userLocation || defaultLocation
                  : defaultLocation
              }
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
                    ref={(ref) => {
                      if (ref) markerRefs.current.set(task.id, ref);
                    }}
                    key={`task-marker-${task.id}`}
                    position={{ lat: task.lat, lng: task.lng }}
                    icon={icon ?? undefined}
                    title={task.title}
                    zIndexOffset={highlightedTaskId === task.id ? 1000 : 0}
                    riseOffset={1000}
                    autoPanOnFocus={true}
                    autoPan={true}
                    autoPanPadding={[50, 180]}
                    riseOnHover={true}
                    eventHandlers={{
                      click: () =>
                        console.log('Marker clicked:', task.id, task.title),
                    }}
                  >
                    <Popup
                      className="leaflet-popup-task"
                      key={`popup-${task.id}`}
                      position={{ lat: task.lat, lng: task.lng }}
                      autoClose={false}
                      closeOnClick={false}
                      closeButton={true}
                    >
                      <div className="text-sm max-w-[200px]">
                        <h4 className="font-bold mb-1">{task.title}</h4>
                        <p className="text-xs">{task.subtitle}</p>
                        <p className="text-xs text-muted mt-1">
                          {task.distance}
                        </p>
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
          </div>
        </ResponsiveMapWrpr>
      </AnimatePresence>

      <TasksOnMap
        className={' absolute z-[1000] w-full lg:w-[487px] lg:top-16 lg:left-5'}
      />
    </div>
  );
};
