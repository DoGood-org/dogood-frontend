import React from 'react';
import {
  AboutSection,
  HeroSection,
  HowItWorks,
  MapSection,
  NewsList,
  Donate,
  Faq, ReviewsSection
} from '@/components';

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
