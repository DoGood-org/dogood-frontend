import {
  AboutSection,
  Donate,
  Faq,
  HeroSection,
  HowItWorks,
  MapSection,
  NewsList,
  ReviewsSection,
} from '@/components';
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
