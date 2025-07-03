'use client';
import React, { JSX, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { createRoot } from 'react-dom/client';
import dynamic from 'next/dynamic';

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
  Container,
  generateTasks,
  TasksList,
  UserLocation,
} from '@/components';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';
import { AnimatedModalWrapper } from '@/components/portal/AnimatedModalWrapper';
import Portal from '@/components/portal/Portal';
import { useMapStore } from '@/zustand/stores/mapStore';
import { AcceptShareLocationPopUp } from './AcceptShareLocationPopUp';
import SearchInput from './filters/SearchInput';
import { FormLocationComponent } from '@/components/main/map/FormLocationComponent';
import { ButtonLocation } from '@/components/main/map/ButtonLocation';
const CustomFormControl = dynamic(
  () =>
    import('@/components/main/map/CustomFormControl').then(
      (mod) => mod.default
    ),
  { ssr: false }
);
const CustomButtonControl = dynamic(
  () =>
    import('@/components/main/map/CustomButtonControl').then(
      (mod) => mod.default
    ),
  { ssr: false }
);
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
    checkLocationPermission,
    addMarker,
    inviteToShareLocationManually,
  } = useMapStore();

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

        // Mount Leaflet Control

        const formContainer = L.DomUtil.create(
          'div',
          'leaflet-control form-location'
        );
        L.DomEvent.disableClickPropagation(formContainer);
        L.DomEvent.disableScrollPropagation(formContainer);
        const formControl = new L.Control({ position: 'bottomright' });

        const buttonContainer = L.DomUtil.create(
          'div',
          'leaflet-control button-location'
        );
        L.DomEvent.disableClickPropagation(buttonContainer);
        L.DomEvent.disableScrollPropagation(buttonContainer);
        const buttonControl = new L.Control({ position: 'bottomright' });
        formControl.onAdd = (): HTMLElement => formContainer;
        buttonControl.onAdd = (): HTMLElement => buttonContainer;

        // Defer until map is mounted
        const interval = setInterval((): void => {
          const mapInstances = (L as any).map?.instances || [];
          const mapInstance = mapInstances[0];
          if (mapInstance && formControl && buttonControl) {
            mapInstance.addControl(formControl);
            mapInstance.addControl(buttonControl);
            createRoot(formContainer).render(
              <FormLocationComponent
                forForm={{
                  customForm: {
                    control: formControl,
                    data: { location: '' },
                  },
                }}
              />
            );

            createRoot(buttonContainer).render(<ButtonLocation />);
            clearInterval(interval);
          }
        }, 100);
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

  const {
    MapContainer,
    TileLayer,
    Marker,
    ZoomControl,
    useMapEvent,
    LayersControl,
    Popup,
  } = leafletComponents;

  const renderTaskMarkers = (): JSX.Element[] => {
    return generatedTasks.map((task, index) => (
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
    const newMarker = { ...latlng, category: MarkerCategoryEnum.Animal };
    if (!isMarkerExists(customMarkers, newMarker)) {
      addMarker(newMarker);
    }
    console.log('Clicked coordinates:', 'new coord', latlng);
  };

  return (
    <Container className="mx-auto relative flex flex-col ">
      <div
        ref={mapContainerRef}
        className="block overflow-hidden rounded-[10px] h-[547px] lg:h-[919px]"
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
          zoom={13}
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
          <ZoomControl position="topright" />
          <CustomButtonControl position="bottomright" />
          <CustomFormControl
            visible={inviteToShareLocationManually}
            position="bottomright"
          />
          {/* <div className="absolute z-[700] bottom-0 left-100">
            <Button variant="filters" onClick={() => checkLocationPermission()}>
              <Vector className="stroke-foreground w-5 h-5" />
            </Button>
          </div> */}
        </MapContainer>
      </div>
      <SearchInput />
      <TasksList />
    </Container>
  );
};

export default Map;
