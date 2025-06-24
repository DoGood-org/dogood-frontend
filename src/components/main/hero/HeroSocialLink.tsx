'use client';
import { SocialLinks } from '@/components/layout/footer/SocialLinks';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

export const HeroSocialLink: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed flex flex-col gap-6 items-center left-8 top-[450px] lg:top-[200px] z-[5000]"
    >
      <div className="w-px h-20 lg:h-[260px] bg-gray-300" />
      <SocialLinks
        className="flex flex-col gap-2 lg:gap-6"
        iconClassName="w-6 h-6 lg:w-8 lg:h-8"
      />
      <div className="w-px h-20 lg:h-[260px] bg-gray-300" />
    </motion.div>
  );
};
