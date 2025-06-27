'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Section } from '@/components';

const Map = dynamic(() => import('@/components/main/map/Map'), { ssr: false });

export const MapSection: React.FC = () => {
  return (
    <Section withContainer={false}>
      <Map />
    </Section>
  );
};
