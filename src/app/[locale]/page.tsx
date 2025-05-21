import React from 'react';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <div className="h-[900px] w-full bg-white" id="next-section">
          <h1>about section</h1>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </>
  );
}
