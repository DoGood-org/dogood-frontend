'use client';
import React, { JSX } from 'react';
import dynamic from 'next/dynamic';
import { Section } from '@/components';
import ContentLoader from '@/components/ui/ContentLoader';

const Map = dynamic(() => import('@/components/main/map/Map'), {
  ssr: false,
  loading: (): JSX.Element => <ContentLoader />,
});

export const MapSection: React.FC = () => {
  return (
    <Section withContainer={false}>
      <Map />
    </Section>
  );
};
