'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Planet from '../../assets/images/hero/planet.png';
import {Button } from '@/components';
import {Container} from '@/components/ui/Container';
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

  // Adjust these values to control when the content starts moving
  const yContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -500]);
  const yPlanet = useTransform(scrollYProgress, [0, 1], [500, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[1080px] w-full">
      {/* Background layer */}
      <Container>
      <div className="absolute mx-auto inset-0 bg-hero bg-no-repeat bg-center bg-cover -z-10" />

      {/* Content layer (under planet) */}
      <motion.div
        className="my-container fixed top-[166px] md:top-[220px] xl:top-[320px] left-1/2 transform -translate-x-1/2 text-white text-center"
        style={{
          y: yContent,
          opacity: contentOpacity,
        }}
      >
        <h1 className="text-[32px] mb-8 font-bold md:text-[40px] xl:text-[72px] xl:font-normal xl:mb-6">
          {t('title')}
        </h1>
        <h2 className="text-2xl font-semibold md:text-[28px] xl:text-[32px] xl:font-normal mb-[52px] md:mb-[36px] xl:mb-[40px]">
          {t('subtitle')}
        </h2>
        <div className="flex flex-col gap-6 md:flex-row md:gap-5 xl:gap-15 justify-center my-container">
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push(`/${localActive}/register`)}
            className="min-w-[186px] md:min-w-[232px] xl:min-w-[147px] btn-expand-hover"
          >
            {t('volunteerBtn')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/${localActive}/about`)}
            className="min-w-[186px] md:min-w-[232px] btn-expand-hover"
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
      </Container>
    </section>
  );
};
