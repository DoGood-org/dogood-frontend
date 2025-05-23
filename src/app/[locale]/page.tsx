import React from 'react';
import HeroSection from '@/components/main/HeroSection';
import Faq from '@/components/faq/faq';
import { AboutSection } from '@/components/main/AboutSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Faq />
    </>
  );
}
