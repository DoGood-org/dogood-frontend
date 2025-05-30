'use client';
import React, { useState, useEffect, JSX } from 'react';
import { Icon, LatLngLiteral } from 'leaflet';
import MedicineMarker from '@/assets/images/map/medicine-marker.png';
import NatureMarker from '@/assets/images/map/nature-marker.png';
import AnimalMarker from '@/assets/images/map/animal-marker.png';
import FoodMarker from '@/assets/images/map/food-marker.png';
import MyPositionMarker from '@/assets/images/map/my-position.png';
import { SearchInput } from './SearchInput';
import { GeolocationPopup } from './GeolocationPopup';
import { MapLocation, MapProps, ReactLeafletModule } from '@/types/mapType';
import { Container } from '../Container';

type MarkerCategory = 'Medicine' | 'Nature' | 'Animal' | 'Food' | 'myPosition';

export const Map: React.FC<MapProps> = ({
  center,
  locations,
  onLocationSelect,
  allowClickToAddMarker = true,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation | undefined
  >();
  const [clickedCoords, setClickedCoords] = useState<LatLngLiteral | null>(
    null
  );
  const [customMarkers, setCustomMarkers] = useState<LatLngLiteral[]>([]);
  const [leafletComponents, setLeafletComponents] =
    useState<ReactLeafletModule | null>(null);
  const [mapMedicineMarkIcon, setMapMedicineMarkIcon] = useState<Icon | null>(
    null
  );
  const [mapNatureMarkIcon, setMapNatureMarkIcon] = useState<Icon | null>(null);
  const [mapAnimalMarkIcon, setMapAnimalMarkIcon] = useState<Icon | null>(null);
  const [mapFoodMarkIcon, setMapFoodMarkIcon] = useState<Icon | null>(null);
  const [mapMyPositionMarkIcon, setMapMyPositionMarkIcon] =
    useState<Icon | null>(null);
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showGeolocationPopup, setShowGeolocationPopup] = useState(false);
  const [geolocationRequested, setGeolocationRequested] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([import('react-leaflet'), import('leaflet')])
        .then(([reactLeafletModule, L]) => {
          setLeafletComponents(reactLeafletModule);

          const createIcon = (src: string): Icon =>
            new L.Icon({
              iconUrl: src,
              iconSize: [30, 35],
            });

          setMapMedicineMarkIcon(createIcon(MedicineMarker.src));
          setMapNatureMarkIcon(createIcon(NatureMarker.src));
          setMapAnimalMarkIcon(createIcon(AnimalMarker.src));
          setMapFoodMarkIcon(createIcon(FoodMarker.src));
          setMapMyPositionMarkIcon(createIcon(MyPositionMarker.src));
          setMapReady(true);
        })
        .catch((error) => {
          console.error('Error loading map components:', error);
          setLocationError('Failed to load map components');
        });
    }
  }, []);

  useEffect(() => {
    if (mapReady && !geolocationRequested) {
      setShowGeolocationPopup(true);
    }
  }, [mapReady, geolocationRequested]);

  const requestGeolocation = (): void => {
    setGeolocationRequested(true);
    setShowGeolocationPopup(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: LatLngLiteral = { lat: latitude, lng: longitude };
          setUserLocation(newLocation);
          setLocationError(null);
          setSelectedLocation({
            ...newLocation,
            id: 'user-location',
            title: 'myPosition',
          });
        },
        (error: GeolocationPositionError) => {
          setLocationError(error.message);
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const declineGeolocation = (): void => {
    setGeolocationRequested(true);
    setShowGeolocationPopup(false);
    setLocationError('User declined geolocation access.');
  };

  if (
    !leafletComponents ||
    !mapMedicineMarkIcon ||
    !mapNatureMarkIcon ||
    !mapAnimalMarkIcon ||
    !mapFoodMarkIcon ||
    !mapMyPositionMarkIcon
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

  const createMarks = (title: MarkerCategory): Icon => {
    switch (title) {
      case 'Medicine':
        return mapMedicineMarkIcon!;
      case 'Nature':
        return mapNatureMarkIcon!;
      case 'Animal':
        return mapAnimalMarkIcon!;
      case 'Food':
        return mapFoodMarkIcon!;
      case 'myPosition':
        return mapMyPositionMarkIcon!;
      default:
        return mapMedicineMarkIcon!;
    }
  };

  const renderMarks = (): JSX.Element[] => {
    return locations.map((location: MapLocation) => (
      <div key={location.id}>
        <Marker
          icon={createMarks(location.title as MarkerCategory)}
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
        icon={mapMedicineMarkIcon!}
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
        icon={mapMyPositionMarkIcon!}
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

  interface MapClickHandlerProps {
    onClick: (latlng: LatLngLiteral) => void;
    allowClickToAddMarker?: boolean;
  }

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
    console.log(clickedCoords);
    setSelectedLocation(undefined);

    const existingMarkerIndex = customMarkers.findIndex(
      (marker) =>
        Math.abs(marker.lat - latlng.lat) < 0.0001 &&
        Math.abs(marker.lng - latlng.lng) < 0.0001
    );

    if (existingMarkerIndex >= 0) {
      setCustomMarkers((prev) =>
        prev.filter((_, index) => index !== existingMarkerIndex)
      );
    } else {
      setCustomMarkers((prev) => [...prev, latlng]);
    }

    onLocationSelect?.(latlng);
  };

  return (
    <Container className="h-[919px] mx-auto relative px-0">
      {showGeolocationPopup && (
        <GeolocationPopup
          requestGeolocation={requestGeolocation}
          declineGeolocation={declineGeolocation}
        />
      )}
      {locationError && (
        <div className="text-red-500 p-2 bg-white rounded shadow mb-2">
          Location Error: {locationError}
        </div>
      )}
      <SearchInput />
      <MapContainer
        center={userLocation || center}
        zoom={13}
        minZoom={5}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full"
        key={userLocation ? 'user-location' : 'default-location'}
      >
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
      </MapContainer>
    </Container>
  );
};

export default Map;
