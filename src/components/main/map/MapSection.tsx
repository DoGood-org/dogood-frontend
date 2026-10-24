'use client';
import React, { JSX, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Section } from '@/components/ui/Section';
import ContentLoader from '@/components/ui/ContentLoader';
import { useMapStore } from '@/zustand/stores/mapStore';

const LazyMap = dynamic(() => import('@/components/main/map/Map'), {
  ssr: false,
  loading: (): JSX.Element => <ContentLoader />,
});

export const MapSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  const pendingFlyTo = useMapStore((s) => s.pendingFlyTo);

  useEffect(() => {
    if (!pendingFlyTo) return;
    const t = setTimeout(() => {
      document
        .getElementById('map')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    return (): void => clearTimeout(t);
  }, [pendingFlyTo]);

  return (
    <Section>
      <div id="map" ref={ref}>
        {inView && <LazyMap />}
      </div>
    </Section>
  );
};
