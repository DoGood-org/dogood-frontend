import { SocialLinks } from '@/components/layout/footer/SocialLinks';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

export const HeroSocialLink: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [1, 0.5], [0, 1]);
  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="fixed flex flex-col items-center left-8 top-[450px] lg:top-[200px] z-[5000]"
    >
      <div className="w-px h-20 lg:h-[260px] bg-gray-300 mb-4" />
      <SocialLinks
        className="flex-col gap-2 lg:gap-6"
        iconClassName="w-6 h-6 lg:w-8 h-8"
      />
      <div className="w-px h-20 lg:h-[260px] bg-gray-300 mb-4" />
    </motion.div>
  );
};

export default HeroSocialLink;
