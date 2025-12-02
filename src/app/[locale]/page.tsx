import { AboutSection } from '@/components/main/about/AboutSection';
import { Donate } from '@/components/main/donate/Donate';
import { Faq } from '@/components/main/faq/Faq';
import { HeroSection } from '@/components/main/hero/HeroSection';
import { HowItWorks } from '@/components/main/howItWorks/HowItWorks';
import { MapSection } from '@/components/main/map/MapSection';
import { NewsList } from '@/components/main/news/NewsList';
import { ReviewsSection } from '@/components/main/reviews/ReviewsSection';
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
