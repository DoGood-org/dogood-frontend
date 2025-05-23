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

  const y = useTransform(scrollYProgress, [0, 1], [500, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[1080px] w-full">
      {/* Background layer */}
      <div className="fixed inset-0 bg-hero bg-center bg-cover -z-10" />

      {/* Content layer (under planet) */}
      <div className="fixed top-[320px] left-1/2 transform -translate-x-1/2 text-white text-center">
        <h1 className="text-[64px] font-bold">{t('title')}</h1>
        <h2 className="text-[32px] font-semibold mb-[50px]">{t('subtitle')}</h2>
        <div className="flex gap-[50px] justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push(`/${localActive}/register`)}
          >
            Become a volunteer
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/${localActive}/about`)}
          >
            Learn more
          </Button>
        </div>
      </div>

      <div className="absolute bottom-[-600px] w-full pointer-events-none z-25">
        <div className="sticky top-0 h-screen flex items-end justify-center ">
          <motion.div
            style={{ y, opacity }}
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
