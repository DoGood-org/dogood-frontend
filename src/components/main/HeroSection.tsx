'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Planet from '../../assets/images/hero/planet.png';
import { Button } from '@/components';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export const HeroSection: React.FC = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const localActive = useLocale();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

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
        className="px-5 fixed top-[166px] md:top-[220px] md:w-[393px] lg:w-full lg:top-[320px] left-1/2 transform -translate-x-1/2 text-foreground text-center"
        style={{
          y: yContent,
          opacity: contentOpacity,
        }}
      >
        <h1 className="text-[32px] mb-6 lg:text-[72px]">{t('title')}</h1>
        <h2 className="text-base mb-8 lg:text-[32px] lg:mb-[40px]">
          {t('subtitle')}
        </h2>
        <div className="flex flex-col gap-6 items-center lg:flex-row lg:gap-15 lg:justify-center">
          <Button
            variant="primary"
            onClick={() => router.push(`/${localActive}/register`)}
            className="w-[255px] h-[48px] text-base py-3 lg:w-[147px] btn-expand-hover"
          >
            {t('volunteerBtn')}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/${localActive}/about`)}
            className="w-[255px] h-[48px] text-base py-3 lg:w-[147px] btn-expand-hover"
          >
            {t('learnMoreBtn')}
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
