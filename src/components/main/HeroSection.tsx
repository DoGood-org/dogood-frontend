'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Planet from '../../assets/images/hero/planet.png';
import { Button } from '@/components';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export const HeroSection = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const localActive = useLocale();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Adjust these values to control when the content starts moving
  const yContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -500]);
  const yPlanet = useTransform(scrollYProgress, [0, 1], [500, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[1080px] w-full">
      {/* Background layer */}
      <div className="fixed inset-0 bg-hero bg-center bg-cover -z-10" />

      {/* Content layer (under planet) */}
      <motion.div
        className="fixed top-[320px] left-1/2 transform -translate-x-1/2 text-white text-center"
        style={{
          y: yContent,
          opacity: contentOpacity,
        }}
      >
        <h1 className="text-[70px] font-bold  mb-[30px]">{t('title')}</h1>
        <h2 className="text-[32px] font-semibold mb-[50px]">{t('subtitle')}</h2>
        <div className="flex gap-[50px] justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push(`/${localActive}/register`)}
          >
            <span className="absolute inset-0 bg-btn-hover origin-center transform scale-x-0 group-hover:scale-x-100 transition-transform duration-800 z-0"></span>
            <span className="relative z-10"> Become a volunteer</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/${localActive}/about`)}
          >
            <span className="absolute inset-0 bg-btn-hover origin-center transform scale-x-0 group-hover:scale-x-100 transition-transform duration-800 z-0"></span>
            <span className="relative z-10"> Learn more</span>
          </Button>
        </div>
      </motion.div>

      {/* Planet layer */}
      <div className="absolute bottom-[-500px] w-full pointer-events-none z-25">
        <div className="sticky top-0 h-screen flex items-end justify-center ">
          <motion.div
            style={{ y: yPlanet, opacity }}
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
