import React from 'react';
import Faq from '@/components/main/Faq';
import Donate from '@/components/main/Donate';
import {
  AboutSection,
  HeroSection,
  HowItWorks,
  MapSection,
  NewsList,
} from '@/components';

export default function Home(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <MapSection />
      <Donate />
      <Faq />
      <NewsList />
    </>
  );
}
