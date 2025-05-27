'use client';
import React, { useState, useEffect } from 'react';
import { Icon, LatLngLiteral } from 'leaflet';
import MedicineMarker from '@/assets/images/map/medicine-marker.png';
import NatureMarker from '@/assets/images/map/nature-marker.png';
import AnimalMarker from '@/assets/images/map/animal-marker.png';
import FoodMarker from '@/assets/images/map/food-marker.png';
import MyPositionMarker from '@/assets/images/map/my-position.jpg';
import SearchInput from './SearchInput';

interface ReactLeafletModule {
  MapContainer: typeof import('react-leaflet').MapContainer;
  TileLayer: typeof import('react-leaflet').TileLayer;
  Marker: typeof import('react-leaflet').Marker;
  useMap: typeof import('react-leaflet').useMap;
  ZoomControl: typeof import('react-leaflet').ZoomControl;
  useMapEvents: typeof import('react-leaflet').useMapEvents;
}
type MapLocation = LatLngLiteral & { id: string; title: string };

type MapProps = {
  center: LatLngLiteral;
  locations: MapLocation[];
  onLocationSelect?: (coords: LatLngLiteral) => void;
  allowClickToAddMarker?: boolean;
};

const Map: React.FC<MapProps> = ({
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-leaflet').then((module) => {
        setLeafletComponents(module);
      });

      import('leaflet').then((L) => {
        // Initialize all icons at once
        const medicineIcon = new L.Icon({
          iconUrl: MedicineMarker.src,
          iconSize: [30, 35],
        });
        const natureIcon = new L.Icon({
          iconUrl: NatureMarker.src,
          iconSize: [30, 35],
        });
        const animalIcon = new L.Icon({
          iconUrl: AnimalMarker.src,
          iconSize: [30, 35],
        });
        const foodIcon = new L.Icon({
          iconUrl: FoodMarker.src,
          iconSize: [30, 35],
        });
        const myPositionIcon = new L.Icon({
          iconUrl: MyPositionMarker.src,
          iconSize: [30, 35],
        });
        setMapMedicineMarkIcon(medicineIcon);
        setMapNatureMarkIcon(natureIcon);
        setMapAnimalMarkIcon(animalIcon);
        setMapFoodMarkIcon(foodIcon);
        setMapMyPositionMarkIcon(myPositionIcon);
      });

      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            setLocationError(null);
          },
          (error) => {
            setLocationError(error.message);
            console.error('Error getting location:', error);
          }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser.');
      }
    }
  }, []);
  console.log(userLocation);
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
        <div className="w-[1056px] h-[560px] mx-auto flex items-center justify-center text-gray-500">
          Loading Map...
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, useMap, ZoomControl, useMapEvents } =
    leafletComponents;

  const SelectedLocation = ({ center }: { center: LatLngLiteral }) => {
    const map = useMap();
    useEffect(() => {
      map.panTo(userLocation || center, { animate: true });
    }, [center, map]);
    return null;
  };

  //create different icon depends of the title of tasks
  const createMarks = (title: string) => {
    switch (title) {
      case 'Medicine':
        return mapMedicineMarkIcon;
        break;
      case 'Nature':
        return mapNatureMarkIcon;
        break;
      case 'Animal':
        return mapAnimalMarkIcon;
        break;
      case 'Food':
        return mapFoodMarkIcon;
        break;
      default:
        return mapMedicineMarkIcon;
    }
  };

  //render all markers of locations from db
  const renderMarks = () => {
    return locations.map((location) => (
      <div key={location.id}>
        <Marker
          icon={createMarks(location.title)}
          position={{ lat: location.lat, lng: location.lng }}
          eventHandlers={{
            click: () => {
              setSelectedLocation(location);
              setClickedCoords({ lat: location.lat, lng: location.lng });
              if (onLocationSelect) {
                onLocationSelect({ lat: location.lat, lng: location.lng });
              }
            },
          }}
        />
      </div>
    ));
  };

  //render marker clicking on map
  const renderCustomMarkers = () => {
    return customMarkers.map((marker, index) => (
      <Marker
        key={`custom-marker-${index}`}
        position={marker}
        icon={mapMedicineMarkIcon}
        eventHandlers={{
          click: () => handleMapClick(marker),
        }}
      />
    ));
  };

  //add marker to user's position
  const renderUserLocation = () => {
    if (!userLocation) return null;
    return (
      <Marker
        position={userLocation}
        icon={mapMyPositionMarkIcon}
        eventHandlers={{
          click: () => {
            setSelectedLocation({
              ...userLocation,
              id: 'user-location',
              title: 'myPosition',
            });
            if (onLocationSelect) {
              onLocationSelect(userLocation);
            }
          },
        }}
      />
    );
  };

  const MapClickHandler = ({
    onClick,
    allowClickToAddMarker,
  }: {
    onClick: (latlng: LatLngLiteral) => void;
    allowClickToAddMarker?: boolean;
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

  const handleMapClick = (latlng: LatLngLiteral) => {
    setClickedCoords(latlng);
    setSelectedLocation(undefined);
    console.log(clickedCoords);
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

    if (onLocationSelect) {
      onLocationSelect(latlng);
    }
  };

  return (
    <div className="w-full">
      <div className="w-[1720px] h-[919px] mx-auto relative">
        {locationError && (
          <div className="text-red-500 p-2 bg-white rounded shadow mb-2">
            Location Error: {locationError}
          </div>
        )}
        <SearchInput />
        <MapContainer
          center={userLocation || center} // Use user's location as center if available
          zoom={13}
          minZoom={5}
          zoomControl={false}
          attributionControl={false}
          className="h-full w-full"
        >
          <TileLayer
            url={'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'}
          />
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
      </div>
    </div>
  );
};

export default Map;
