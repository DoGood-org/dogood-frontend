'use client';
import React, { useState, useEffect, JSX } from 'react';
import { useInView } from 'react-intersection-observer';

import { Icon, LatLngLiteral } from 'leaflet';
import {
  initializeMapIcons,
  getMarkerIcon,
  isMarkerExists,
  getUserGeolocation,
} from '@/lib/mapUtils';
import {
  LeafletType,
  MapClickHandlerProps,
  MapLocation,
  MapProps,
  MarkerCategory,
  ReactLeafletModule,
} from '@/types/mapType';
import { GeolocationPopup, Container, Button, TasksList } from '@/components';
import { Vector } from '@/components/icons';
import SearchInput from './SearchInput';
import Portal from '@/components/portal/Portal';
import { AnimatedModalWrapper } from '@/components/portal/AnimatedModalWrapper';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';

export const Map: React.FC<MapProps> = ({
  center,
  locations,
  onLocationSelect,
  allowClickToAddMarker = true,
}) => {
  const { ref: mapContainerRef, inView: isInView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
    delay: 100,
  });
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null
  );
  const [clickedCoords, setClickedCoords] = useState<LatLngLiteral | null>(
    null
  );
  const [customMarkers, setCustomMarkers] = useState<LatLngLiteral[]>([]);
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
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showGeolocationPopup, setShowGeolocationPopup] =
    useState<boolean>(false);

  useEffect(() => {
    if (isInView) {
      console.log('Map in view:', isInView);
      setShowGeolocationPopup(true);
    }
  }, [isInView]);

  // Load all leaflet components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([import('react-leaflet'), import('leaflet')])
        .then(([reactLeafletModule, L]) => {
          setLeafletComponents(reactLeafletModule);
          setMapIcons(initializeMapIcons(L as unknown as LeafletType));
        })
        .catch((error) => {
          console.error('Error loading map components:', error);
          setLocationError('Failed to load map components');
        });
    }
  }, []);

  // Handle accept geolocation
  const requestGeolocation = async (): Promise<void> => {
    setShowGeolocationPopup(false);
    try {
      const location = await getUserGeolocation();
      setUserLocation(location);
      setLocationError(null);
      setSelectedLocation({
        ...location,
        id: 'user-location',
        title: 'myPosition',
      });
    } catch (error) {
      setLocationError(error instanceof Error ? error.message : String(error));
      console.error('Error getting location:', error);
    }
  };

  // Handle decline geolocation
  const declineGeolocation = (): void => {
    setShowGeolocationPopup(false);
    setLocationError('User declined geolocation access.');
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

  const { MapContainer, TileLayer, Marker, useMap, ZoomControl, useMapEvents } =
    leafletComponents;

  const SelectedLocation: React.FC<{ center: LatLngLiteral }> = ({
    center,
  }) => {
    const map = useMap();
    useEffect(() => {
      map.panTo(userLocation || center, { animate: true });
    }, [center, map]);
    return null;
  };

  const renderMarks = (): JSX.Element[] => {
    return locations.map((location: MapLocation) => (
      <div key={location.id}>
        <Marker
          icon={getMarkerIcon(location.title as MarkerCategory, mapIcons)}
          position={{ lat: location.lat, lng: location.lng }}
          eventHandlers={{
            click: () => {
              setSelectedLocation(location);
              setClickedCoords({ lat: location.lat, lng: location.lng });
              onLocationSelect?.({ lat: location.lat, lng: location.lng });
            },
          }}
        />
      </div>
    ));
  };

  const renderCustomMarkers = (): JSX.Element[] => {
    return customMarkers.map((marker, index) => (
      <Marker
        key={`custom-marker-${index}`}
        position={marker}
        icon={mapIcons.medicineIcon!}
        eventHandlers={{
          click: () => handleMapClick(marker),
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
            setSelectedLocation({
              ...userLocation,
              id: 'user-location',
              title: 'myPosition',
            });
            onLocationSelect?.(userLocation);
          },
        }}
      />
    );
  };

  const MapClickHandler: React.FC<MapClickHandlerProps> = ({
    onClick,
    allowClickToAddMarker,
  }) => {
    useMapEvents({
      click: (e: { latlng: LatLngLiteral }) => {
        if (allowClickToAddMarker) {
          onClick(e.latlng);
        }
      },
    });
    return null;
  };

  const handleMapClick = (latlng: LatLngLiteral): void => {
    setClickedCoords(latlng);
    setSelectedLocation(null);
    console.log(clickedCoords);
    if (isMarkerExists(customMarkers, latlng)) {
      setCustomMarkers((prev) =>
        prev.filter(
          (marker) =>
            !(
              Math.abs(marker.lat - latlng.lat) < 0.0001 &&
              Math.abs(marker.lng - latlng.lng) < 0.0001
            )
        )
      );
    } else {
      setCustomMarkers((prev) => [...prev, latlng]);
    }

    onLocationSelect?.(latlng);
  };

  return (
    <Container className="mx-auto relative flex flex-col ">
      <>
        <div ref={mapContainerRef} className="h-[547px] lg:h-[919px]">
          {showGeolocationPopup && (
            <Portal>
              <AnimatedModalWrapper
                isVisible={true}
                onClose={declineGeolocation}
              >
                <GeolocationPopup
                  requestGeolocation={requestGeolocation}
                  declineGeolocation={declineGeolocation}
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
            center={userLocation || center}
            zoom={13}
            minZoom={5}
            zoomControl={false}
            attributionControl={false}
            className="h-full w-full"
            key={userLocation ? 'user-location' : 'default-location'}
            scrollWheelZoom={false}
          >
            <ScrollAfterDelay delay={2000} />
            <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
            {selectedLocation && (
              <SelectedLocation center={userLocation || center} />
            )}
            <MapClickHandler
              onClick={handleMapClick}
              allowClickToAddMarker={allowClickToAddMarker}
            />
            {renderMarks()}
            {renderCustomMarkers()}
            {renderUserLocation()}
            <ZoomControl position="topright" />
            <Button
              variant="filters"
              className="z-[700] absolute top-[95px] right-[10px] p-[10px]"
              onClick={requestGeolocation}
            >
              <Vector className="stroke-foreground w-5 h-5" />
            </Button>
          </MapContainer>
        </div>
        <SearchInput />
        <TasksList />
      </>
    </Container>
  );
};

export default Map;
