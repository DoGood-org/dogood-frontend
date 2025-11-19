import {
  AboutSection,
  Donate,
  Faq,
  HeroSection,
  HowItWorks,
  NewsList,
  ReviewsSection,
} from '@/components';
import { MapSection } from '@/components/main/map/MapSection';
import React from 'react';

export default function Home(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <MapSection />
      <Donate />
      <ReviewsSection />
      <NewsList />
      <Faq />
    </>
  );
}
