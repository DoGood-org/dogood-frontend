'use client';
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Planet from '@/assets/images/hero/planet.png';
import { Button, HeroSocialLink } from '@/components';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import bgHero from '@/assets/images/hero/bg-hero.png';
import mobHero from '@/assets/images/hero/mob-hero.png';
import tabletHero from '@/assets/images/hero/tablet-hero.png';


export const HeroSection: React.FC = () => {
  const t = useTranslations('common');
  const router = useRouter();
  const localActive = useLocale();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const yContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -500]);
  const yPlanet = useTransform(scrollYProgress, [0, 1], [500, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh w-full bg-background text-foreground overflow-visible"
    >
      {/* Background layer */}
      {/* <div className="fixed inset-0 bg-hero bg-center bg-cover -z-10" /> */}
      <div className="relative w-full h-dvh pt-[104px] hidden lg:block">
        <Image
          src={bgHero}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>
      <div className="relative w-full h-dvh pt-[104px] block md:hidden lg:hidden ">
        <Image
          src={mobHero}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>
      <div className="relative w-full h-dvh pt-[104px] hidden md:block lg:hidden ">
        <Image
          src={tabletHero}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>

      {/* <div className="absolute inset-0  opacity-50" /> */}
      <div className="relative z-10">
        <HeroSocialLink />
      </div>
      {/* Content layer (under planet) */}
      <motion.div
        className="px-5 fixed top-[166px] md:top-[220px] md:w-[393px] lg:w-full lg:top-[320px] left-1/2 transform -translate-x-1/2 text-foreground text-center"
        style={{
          y: yContent,
          opacity: contentOpacity,
        }}
      >
        <h1 className="text-h1 text-white mb-6 lg:text-h1-d">{t('title')}</h1>
        <h2 className="text-white mb-8 lg:text-lg lg:mb-[40px]">
          {t('subtitle')}
        </h2>
        <div className="flex flex-col gap-6 items-center lg:flex-row lg:gap-15 lg:justify-center">
          <Button
            variant="primary"
            onClick={() => router.push(`/${localActive}/register`)}
            className="w-[255px] h-[48px] text-base text-white py-3 lg:w-[147px]"
          >
            {t('volunteerBtn')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/${localActive}/about`)}
            className="w-[255px] h-[48px] text-base text-white py-3 lg:w-[147px]"
          >
            {t('learnMoreBtn')}
          </Button>
        </div>
      </motion.div>
      {/* Planet layer */}
      <div className="absolute bottom-[-500px] w-full pointer-events-none z-25">
        <div className="sticky bottom-0 h-screen flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }} // start animating when 50% in view
            transition={{ duration: 2, ease: 'easeOut' }}
            className="relative w-[990px] max-w-full"
          >
            <Image
              src={Planet}
              alt="Planet"
              width={990}
              height={990}
              className="drop-shadow"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
