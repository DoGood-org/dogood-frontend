'use client';
import React, { JSX, useEffect, useState } from 'react';
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
  Button,
  Container,
  GeolocationPopup,
  TASKS,
  TasksList,
  UserLocation,
} from '@/components';
import { Vector } from '@/components/icons';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';
import { AnimatedModalWrapper } from '@/components/portal/AnimatedModalWrapper';
import Portal from '@/components/portal/Portal';
import { useMapStore } from '@/zustand/stores/mapStore';
import SearchInput from './filters/SearchInput';

// const coordsMatch = (a: LatLngLiteral, b: LatLngLiteral) =>
//   Math.abs(a.lat - b.lat) < 0.0001 && Math.abs(a.lng - b.lng) < 0.0001;

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
    setSelectedTask,
    hasAgreedToLocation,
    setHasAgreedToLocation,
    showGeolocationPopup,
    setShowGeolocationPopup,
    locationError,
    checkLocationPermission,
    addMarker,
  } = useMapStore();

  // const memoizedCustomMarkers = React.useMemo<TCustomMarker[]>(
  //   () => customMarkers as TCustomMarker[],
  //   [customMarkers]
  // );

  const [leafletComponents, setLeafletComponents] =
    useState<ReactLeafletModule | null>(null);
  const [mapIcons, setMapIcons] = useState<{
    medicineIcon: Icon | null;
    natureIcon: Icon | null;
    animalIcon: Icon | null;
    foodIcon: Icon | null;
    myPositionIcon: Icon | null;
  }>({
    medicineIcon: null,
    natureIcon: null,
    animalIcon: null,
    foodIcon: null,
    myPositionIcon: null,
  });

  // Load all leaflet components
  useEffect((): void => {
    if (typeof window !== 'undefined') {
      Promise.all([import('react-leaflet'), import('leaflet')])
        .then(([reactLeafletModule, L]) => {
          const customIcons = initializeMapIcons(L as unknown as LeafletType);
          setLeafletComponents(reactLeafletModule);
          setMapIcons(customIcons);
          console.log('Map icons initialized:', customIcons);
        })
        .catch((error) => {
          console.error('Error loading map components:', error);
        });
    }
  }, []);

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
  const declinedToShareLocation = (): void => {
    setHasAgreedToLocation(false);
    setShowGeolocationPopup(false);
  };
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

  const { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents } =
    leafletComponents;

  const renderTaskMarkers = (): JSX.Element[] => {
    return TASKS.map((task, index) => (
      <Marker
        key={`task-marker-${index}`}
        position={{ lat: task.lat, lng: task.lng }}
        icon={getMarkerIcon(task.category[0] as MarkerCategoryEnum, mapIcons)}
        eventHandlers={{
          click: () => {
            setSelectedTask({
              id: task.id,
              lat: task.lat,
              lng: task.lng,
              title: task.title,
              category: task.category,
              distance: task.distance,
              description: task.description,
            });
            console.log('Task selected:', task);
            <div className="text-red-500 p-2 bg-white rounded shadow mb-2">
              Task selected: {task.title}
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
  // const renderCustomMarkers = (): JSX.Element[] =>
  //   memoizedCustomMarkers.map((marker, index) => (
  //     <Marker
  //       key={`custom-marker-${index}`}
  //       position={marker}
  //       icon={getMarkerIcon(marker.category ?? MarkerCategoryEnum.Food, mapIcons)}
  //       eventHandlers={{
  //         click: () => {
  //           if (isMarkerExists(memoizedCustomMarkers, marker)) {
  //             if (marker.category) {
  //               removeMarker({ ...marker, category: marker.category });
  //             }
  //           } else {
  //             if (marker.category) {
  //               addMarker({ ...marker, category: marker.category });
  //             }
  //           }
  //         },
  //       }}
  //     />
  //   ));

  const MapClickHandler: React.FC<MapClickHandlerProps> = ({
    onClick,
    allowClickToAddMarker,
  }): JSX.Element | null => {
    useMapEvents({
      click: (e: { latlng: LatLngLiteral }) => {
        if (allowClickToAddMarker) {
          onClick(e.latlng);
          console.log('Clicked coordinates:', e.latlng);
        }
      },
    });
    return null;
  };

  const handleMapClick = (latlng: LatLngLiteral): void => {
    const newMarker = { ...latlng, category: MarkerCategoryEnum.Animal };
    if (!isMarkerExists(customMarkers, newMarker)) {
      addMarker(newMarker);
    }
    console.log('Clicked coordinates:', 'new coord', latlng);
  };

  return (
    <Container className="mx-auto relative flex flex-col ">
      <div ref={mapContainerRef} className="h-[547px] lg:h-[919px]">
        {showGeolocationPopup && (
          <Portal>
            <AnimatedModalWrapper
              isVisible={showGeolocationPopup}
              onClose={declinedToShareLocation}
            >
              <GeolocationPopup
                requestGeolocation={acceptToShareLocation}
                declineGeolocation={declinedToShareLocation}
              />
            </AnimatedModalWrapper>
          </Portal>
        )}
        {locationError && (
          <div className="text-red-500 p-2 bg-white rounded shadow mb-2">
            Location Error: {locationError}
          </div>
        )}
        <MapContainer
          className="h-full w-full cursor-default"
          center={userLocation || { lat: 27.9944024, lng: -81.7602544 }}
          zoom={13}
          minZoom={5}
          zoomControl={false}
          attributionControl={false}
          key={'default-location'}
          scrollWheelZoom={false}
        >
          <ScrollAfterDelay delay={2000} />
          <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
          {userLocation && <UserLocation />}
          <MapClickHandler
            onClick={handleMapClick}
            allowClickToAddMarker={true}
          />
          {renderTaskMarkers()}
          {/* {renderCustomMarkers()} */}
          {renderUserLocation()}
          <ZoomControl position="topright" />
          <Button
            variant="filters"
            className="z-[700] absolute top-[95px] right-[10px] p-[10px]"
            onClick={() => checkLocationPermission()}
          >
            <Vector className="stroke-foreground w-5 h-5" />
          </Button>
        </MapContainer>
      </div>
      <SearchInput />
      <TasksList />
    </Container>
  );
};

export default Map;
