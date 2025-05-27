import React from 'react';
import Faq from '@/components/faq/faq';
import { AboutSection, HeroSection, MapSection } from '@/components';

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
