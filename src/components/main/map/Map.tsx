'use client';
import React, { JSX, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  getMarkerIcon,
  initializeMapIcons,
  isMarkerExists,
} from '@/lib/mapUtils';
import { Icon, LatLngLiteral } from 'leaflet';

import {
  LeafletType,
  MapClickHandlerProps,
  MarkerCategoryEnum,
  ReactLeafletModule,
} from '@/types/mapType';

import {
  AnimatedDrawler,
  ButtonOpenTasks,
  Container,
  CustomControl,
  Filters,
  generateTasks,
  TasksList,
  UserLocation,
} from '@/components';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';
import { AnimatedModalWrapper } from '@/components/portal/AnimatedModalWrapper';
import Portal from '@/components/portal/Portal';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AcceptShareLocationPopUp } from './AcceptShareLocationPopUp';

import { FormSearch } from '@/components/main/map/filters/FormSearch';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useFilteredTasksSelector } from '@/zustand/selectors/filteredTasksSelectors';
import { AnimatePresence, motion } from 'framer-motion';

export const Map: React.FC = (): JSX.Element => {
  const { ref: mapContainerRef, inView: isInView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
    delay: 100,
  });

  const {
    userLocation,
    setUserLocation,
    customMarkers,
    requestGeolocation,
    hasAgreedToLocation,
    setHasAgreedToLocation,
    showGeolocationPopup,
    setShowGeolocationPopup,
    checkLocationPermission,
    addMarker,
    taskListIsOpen,
    toggleTaskList,
    filtersIsOpen,
    activePanel,
  } = useMapStore();

  const { setTasks } = useTaskStore();
  const { setCategories } = useFilterStore();
  const [leafletComponents, setLeafletComponents] =
    useState<ReactLeafletModule | null>(null);

  const [mapIcons, setMapIcons] = useState<{
    medicineIcon: Icon | null;
    natureIcon: Icon | null;
    animalIcon: Icon | null;
    foodIcon: Icon | null;
    myPositionIcon: Icon | null;
    defaultIcon: Icon | null;
  }>({
    medicineIcon: null,
    natureIcon: null,
    animalIcon: null,
    foodIcon: null,
    myPositionIcon: null,
    defaultIcon: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    Promise.all([import('react-leaflet'), import('leaflet')])
      .then(([reactLeafletModule, L]) => {
        const customIcons = initializeMapIcons(L as unknown as LeafletType);
        setLeafletComponents({
          MapContainer: reactLeafletModule.MapContainer,
          TileLayer: reactLeafletModule.TileLayer,
          Marker: reactLeafletModule.Marker,
          ZoomControl: reactLeafletModule.ZoomControl,
          useMapEvent: reactLeafletModule.useMapEvent,
          LayersControl: reactLeafletModule.LayersControl,
          useMap: reactLeafletModule.useMap,
          Popup: reactLeafletModule.Popup,
          Circle: reactLeafletModule.Circle,
          Polyline: reactLeafletModule.Polyline,
          GeoJSON: reactLeafletModule.GeoJSON,
          Control: L.Control,
        } as ReactLeafletModule);
        setMapIcons(customIcons);
      })
      .catch((error) => {
        console.error('Error loading map components:', error);
      });
  }, []);

  //  // Check if map is in view and request geolocation permission
  useEffect((): void => {
    if (isInView) {
      console.log('Map is in view, checking location permission...');
      checkLocationPermission();
    }
  }, [isInView, checkLocationPermission]);
  // Handle accept geolocation
  const acceptToShareLocation = (): void => {
    if (!hasAgreedToLocation) {
      setHasAgreedToLocation(true);
    }
    setShowGeolocationPopup(false);
    requestGeolocation();
  };
  // Handle decline geolocation
  const declinedToShareLocation = (): void => {
    setHasAgreedToLocation(false);
    setShowGeolocationPopup(false);
  };

  const generatedTasks = useMemo(() => {
    return generateTasks(
      userLocation?.lat || 27.9944024,
      userLocation?.lng || -81.7602544
    );
  }, [userLocation?.lat, userLocation?.lng]);

  useEffect(() => {
    if (generatedTasks.length > 0) {
      setTasks(generatedTasks);
      const categories = Array.from(
        new Set(generatedTasks.flatMap((task) => task.category))
      );
      setCategories(categories);
      console.log(
        'Generated tasks:',
        generatedTasks,
        'Categories:',
        categories
      );
    }
  }, [generatedTasks]);

  const { noPaginatedTasks } = useFilteredTasksSelector();

  if (
    !leafletComponents ||
    !mapIcons ||
    Object.values(mapIcons).length === 0 ||
    Object.values(mapIcons).some((icon) => !icon)
  ) {
    return (
      <div className="w-full bg-background">
        <div className="max-w-[1920px] px-[100px] h-[560px] mx-auto flex items-center justify-center text-gray-500">
          Loading Map...
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, useMapEvent, LayersControl, Popup } =
    leafletComponents;

  const renderTaskMarkers = (): JSX.Element[] => {
    return noPaginatedTasks.map((task) => (
      <Marker
        key={`task-marker-${task.id}`}
        position={{ lat: task.lat, lng: task.lng }}
        icon={getMarkerIcon(
          task.category?.[0] || MarkerCategoryEnum.Default,
          mapIcons
        )}
        eventHandlers={{
          click: () => {
            console.log('Task clicked:', task);
            <div className="text-red-500 p-2 bg-white rounded shadow mb-2">
              Task clicked: {task.title}
            </div>;
          },
        }}
      />
    ));
  };
  const renderUserLocation = (): JSX.Element | null => {
    if (!userLocation) return null;
    return (
      <Marker
        position={userLocation}
        icon={mapIcons.myPositionIcon!}
        eventHandlers={{
          click: () => {
            setUserLocation({
              ...userLocation,
            });
            console.log('User location selected:', userLocation);
            // onLocationSelect?.({ lat: userLocation.lat, lng: userLocation.lng });
          },
        }}
      />
    );
  };
  const MapClickHandler: React.FC<MapClickHandlerProps> = ({
    onClick,
    allowClickToAddMarker,
  }): JSX.Element | null => {
    useMapEvent('click', (e: { latlng: LatLngLiteral }) => {
      if (allowClickToAddMarker) {
        onClick(e.latlng);
        console.log('Clicked coordinates:', e.latlng);
        return (
          <Popup>
            <div className="text-red-500 p-2 bg-white rounded shadow mb-2">
              Coordinates: {e.latlng.lat}, {e.latlng.lng}
            </div>
          </Popup>
        );
      }
    });
    return null;
  };
  const handleMapClick = (latlng: LatLngLiteral): void => {
    const newMarker = { ...latlng, category: MarkerCategoryEnum.Default };
    if (!isMarkerExists(customMarkers, newMarker)) {
      addMarker(newMarker);
    }
    console.log('Clicked coordinates:', 'new coord', latlng);
  };

  return (
    <Container className="mx-auto flex flex-col ">
      <div className="relative flex flex-col rounded-[12px] overflow-hidden bg-card ">
        <div
          ref={mapContainerRef}
          className="block overflow-hidden border-background text-foreground rounded-t-[10px] h-[547px] lg:h-[919px]"
        >
          {showGeolocationPopup && (
            <Portal>
              <AnimatedModalWrapper
                isVisible={showGeolocationPopup}
                onClose={declinedToShareLocation}
              >
                <AcceptShareLocationPopUp
                  requestGeolocation={acceptToShareLocation}
                  declineGeolocation={declinedToShareLocation}
                />
              </AnimatedModalWrapper>
            </Portal>
          )}

          <MapContainer
            className="h-full w-full cursor-default relative"
            center={userLocation || { lat: 27.9944024, lng: -81.7602544 }}
            zoom={14}
            minZoom={5}
            zoomControl={false}
            attributionControl={false}
            key={'default-location'}
            scrollWheelZoom={false}
          >
            <ScrollAfterDelay delay={2000} />
            <LayersControl position="topright">
              {/* 🌐 Base layers */}

              <LayersControl.BaseLayer checked name="Google Maps">
                <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="OpenStreetMap">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </LayersControl.BaseLayer>

              {/* 📍 Overlays */}
            </LayersControl>
            <>{renderUserLocation()}</>
            {userLocation && <UserLocation />}
            <MapClickHandler
              onClick={handleMapClick}
              allowClickToAddMarker={true}
            />
            {renderTaskMarkers()}
            {/* {renderCustomMarkers()} */}
            {renderUserLocation()}

            <CustomControl />

            {/* <CustomFormControl
            visible={true}
            position="bottomright"
          /> */}
          </MapContainer>
        </div>

        <div className="flex flex-col relative lg:absolute lg:flex lg:top-12 lg:left-32 lg:z-[500]">
          <ButtonOpenTasks
            onClick={() => toggleTaskList()}
            isOpen={taskListIsOpen}
            className="mx-auto mb-2 lg:mb-0 lg:absolute lg:z-[500] lg:top-18 lg:left-1/2 lg:translate-x-[-50%] lg:bg-card lg:w-16"
          />
          <FormSearch />
        </div>

        <AnimatedDrawler
          isVisible={!!activePanel}
          direction="vertical"
          className={`
            relative flex flex-col bg-card z-[1000]
            w-full h-[675px] lg:mt-0
            lg:absolute lg:top-36 lg:left-32 lg:w-[487px] lg:h-[722px] lg:rounded-md lg:shadow-xl overflow-y-hidden
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
