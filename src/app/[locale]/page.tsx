import React from 'react';
import Faq from '@/components/faq/faq';
import { AboutSection, HeroSection } from '@/components';
import MapSection from '@/components/main/map/MapSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MapSection />
      <Faq />
    </>
  );
}
