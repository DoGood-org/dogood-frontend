import React from 'react';
import Faq from '@/components/main/Faq';
import {
  AboutSection,
  HeroSection,
  HowItWorks,
  MapSection,
} from '@/components';

export default function Home(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <MapSection />
      <Faq />
    </>
  );
}
