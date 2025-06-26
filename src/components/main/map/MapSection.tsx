'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Section } from '@/components';

const Map = dynamic(() => import('@/components/main/map/Map'), { ssr: false });

export const MapSection: React.FC = () => {
  const floridaCenter = {
    lat: 28.6305,
    lng: -82.4497,
  };
  return (
    <Section withContainer={false}>
      <Map center={floridaCenter} />
    </Section>
  );
};
