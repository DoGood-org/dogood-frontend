// src/components/main/MapSection.tsx
'use client'; // This is important for MapSection itself if it has client-side logic
import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import for the Map component with ssr: false
const Map = dynamic(() => import('@/components/main/map/Map'), { ssr: false });

const MapSection = () => {
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
  return (
    <section className="bg-background pt-[100px]">
      <Map
        center={{ lng: -0.1278, lat: 51.5074 }}
        locations={locations}
        onLocationSelect={(coords) =>
          console.log('Selected coordinates:', coords)
        }
        allowClickToAddMarker={true}
      />
    </section>
  );
};

export default MapSection;
