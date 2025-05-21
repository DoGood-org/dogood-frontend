'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Planet from '../assets/images/planet.png';

const HeroSection = () => {
  const t = useTranslations('common');
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to motion values
  const y = useTransform(scrollYProgress, [0, 1], [500, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[1080px] w-full">
      {/* Fixed background */}
      <div className="fixed inset-0 bg-hero bg-center bg-cover -z-10">
        {/* Fixed heading */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-[32px] font-bold">{t('title')}</h1>
          <h2 className="text-[25px] font-semibold">{t('subtitle')}</h2>
        </div>
      </div>

      {/* Scrollable planet image container */}
      <div className="absolute bottom-[-500px] w-full">
        <div className="sticky top-0 h-screen flex items-end justify-center">
          <motion.div
            style={{
              y,
              opacity,
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            <Image
              src={Planet}
              alt="Planet"
              width={990}
              height={990}
              className="drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
