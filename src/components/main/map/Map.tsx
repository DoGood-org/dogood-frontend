'use client';
import React, { useState, useEffect } from 'react';

import { Icon } from 'leaflet';
import { initializeMapIcons } from '@/lib/mapUtils';
import { LeafletType, MapProps, ReactLeafletModule } from '@/types/mapType';
import { Container, TasksList } from '@/components';
import SearchInput from './SearchInput';
import { ScrollAfterDelay } from '@/components/main/map/ScrollAfterDelay';

export const Map: React.FC<MapProps> = ({ center }) => {
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
    if (typeof window !== 'undefined') {
      Promise.all([import('react-leaflet'), import('leaflet')])
        .then(([reactLeafletModule, L]) => {
          setLeafletComponents(reactLeafletModule);
          setMapIcons(initializeMapIcons(L as unknown as LeafletType));
        })
        .catch((error) => {
          console.error('Error loading map components:', error);
        });
    }
  }, []);

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

  const { MapContainer, TileLayer, ZoomControl } = leafletComponents;

  return (
    <Container className="mx-auto relative flex flex-col ">
      <div className="h-[547px] lg:h-[919px]">
        <MapContainer
          className="h-full w-full cursor-default"
          center={center}
          zoom={13}
          minZoom={5}
          zoomControl={false}
          attributionControl={false}
          key={'default-location'}
          scrollWheelZoom={false}
        >
          <ScrollAfterDelay delay={2000} />
          <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
          <ZoomControl position="topright" />
        </MapContainer>
      </div>
      <SearchInput />
      <TasksList />
    </Container>
  );
};

export default Map;
