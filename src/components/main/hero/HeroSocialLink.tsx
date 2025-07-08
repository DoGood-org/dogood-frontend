'use client';
import { SocialLinks } from '@/components/layout/footer/SocialLinks';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import React, { useRef, useState } from 'react';

export const HeroSocialLink: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const direction = latest > lastScrollY ? 'down' : 'up';
    setScrollDirection(direction);
    setLastScrollY(latest);
  });

  const opacityDown = useTransform(scrollY, [0, 500], [1, 0], { clamp: false });

  const opacityUp = useTransform(scrollY, [500, 0], [0, 1], { clamp: false });

  return (
    <div className="absolute inset-0 w-full h-screen" ref={containerRef}>
      <motion.div
        style={{
          opacity: scrollDirection === 'down' ? opacityDown : opacityUp,
          transition: `opacity ${scrollDirection === 'up' ? '1.2s' : '0.4s'} cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
        className="fixed flex flex-col gap-6 items-center left-8 top-[450px] lg:top-[200px] z-[5000]"
      >
        <div className="w-px h-20 lg:h-[260px] bg-gray-300" />
        <SocialLinks
          className="flex flex-col gap-2 lg:gap-6"
          iconClassName="w-6 h-6 lg:w-8 lg:h-8"
        />
        <div className="w-px h-20 lg:h-[260px] bg-gray-300" />
      </motion.div>
    </div>
  );
};
