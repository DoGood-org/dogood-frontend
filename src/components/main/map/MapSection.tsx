'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { LatLngLiteral } from 'leaflet';

const Map = dynamic(() => import('@/components/main/map/Map'), { ssr: false });

export const MapSection: React.FC = () => {
  const locations = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Medicine',
      lat: 39.9379,
      lng: 9.7112,
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      title: 'Nature',
      lat: 39.9534,
      lng: 9.7091,
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      title: 'Food',
      lat: 39.9368,
      lng: 9.7094,
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      title: 'Animal',
      lat: 39.9374,
      lng: 9.7068,
    },
  ];

  const floridaCenter = {
    lat: 28.6305,
    lng: -82.4497,
  };
  return (
    <section className="bg-background pt-[100px]">
      <Map
        center={floridaCenter}
        locations={locations}
        onLocationSelect={(coords: LatLngLiteral) =>
          console.log('Selected coordinates:', coords)
        }
        allowClickToAddMarker={false}
      />
    </section>
  );
};
