'use client';
import { useRef, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { HeroContentLayer } from './HeroContentLayer';
import { HeroPlanetLayer } from './HeroPlanetLayer';
import { HeroSocialLink } from '@/components';

import HeroBgMobile from '@/assets/images/hero/mob-hero.png';
import HeroBgTablet from '@/assets/images/hero/tablet-hero.png';
import HeroBgDesktop from '@/assets/images/hero/bg-hero.png';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1440px)');

  const backgroundImage = isMobile
    ? HeroBgMobile
    : isTablet
      ? HeroBgTablet
      : HeroBgDesktop;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const yContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -500]);
  const yPlanet = useTransform(scrollYProgress, [0, 1], [500, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[1080px] w-full">
      <div className="fixed inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
      </div>
      <HeroContentLayer yContent={yContent} contentOpacity={contentOpacity} />
      <HeroSocialLink />
      <HeroPlanetLayer yPlanet={yPlanet} opacity={opacity} />
    </section>
  );
};
