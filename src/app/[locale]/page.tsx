import React from 'react';
import Faq from '@/components/main/Faq';
import { AboutSection, HeroSection, MapSection } from '@/components';
import Donate from '@/components/main/Donate';

export default function Home(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MapSection />
      <Donate />
      <Faq />
    </>
  );
}
