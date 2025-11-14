'use client';
import React, { JSX } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Section } from '@/components/ui/Section';
import ContentLoader from '@/components/ui/ContentLoader';

const LazyMap = dynamic(() => import('@/components/main/map/Map'), {
  ssr: false,
  loading: (): JSX.Element => <ContentLoader />,
});

export const MapSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  return (
    <Section>
      <div ref={ref}>{inView && <LazyMap />}</div>
    </Section>
  );
};
