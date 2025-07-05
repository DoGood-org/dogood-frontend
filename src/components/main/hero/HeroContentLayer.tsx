'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components';
import { HeroContentLayerProps } from '@/types/heroTypes';

export const HeroContentLayer: React.FC<HeroContentLayerProps> = ({
  yContent,
  contentOpacity,
}) => {
  const t = useTranslations('common');
  const router = useRouter();
  const localActive = useLocale();
  const handleClick = (): never => {
    throw new Error('This is a test error!');
  };
  return (
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
          onClick={handleClick}
          // onClick={() => router.push(`/${localActive}/register`)}
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
  );
};
