'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import HeroSupportDesck from '@/assets/images/support/supportImgDesk.webp';
import HeroSupportTabl from '@/assets/images/support/supportImgTabl.webp';
import HeroSupportMob from '@/assets/images/support/supportImgMob.webp';
import { Section } from '../ui/Section';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { ContactFormModal } from './ContactFormModal';
import { useResponsiveImage } from '@/hooks/useResponsiveImage';

export const ContactSupportSection = (): React.JSX.Element => {
  const t = useTranslations('supportPage');
  const [isOpen, setIsOpen] = useState(false);
  const {
    image: heroImage,
    isMobile,
    isTablet,
  } = useResponsiveImage({
    mobile: HeroSupportMob,
    tablet: HeroSupportTabl,
    desktop: HeroSupportDesck,
  });
  const getDimensions = (): {
    width: number;
    height: number;
  } => {
    if (isMobile) return { width: 262, height: 215 };
    if (isTablet) return { width: 311, height: 256 };
    return { width: 402, height: 331 };
  };
  const { width, height } = getDimensions();
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return (): void => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);
  return (
    <Section>
      <div className="md:relative md:mt-25">
        <Image
          src={heroImage}
          alt={t('imageHeroAlt')}
          width={width}
          height={height}
          className="rounded-xl object-fill mb-4 mx-auto md:mb-0 md:absolute md:-top-28 md:-right-4 lg:-top-5 lg:right-6"
        />
        <div className="bg-btn-active p-12 rounded-lg ">
          <p className="mb-6 md:text-h2-m md:w-[341px] md:mb-4 lg:text-h2 lg:w-[654px] lg:mb-[134px] text-foreground">
            {t('contactSupportText')}
          </p>
          <Button
            variant="primary"
            size="lg"
            className="text-white px-6"
            onClick={() => setIsOpen(!isOpen)}
          >
            {t('contactSupportBtn')}
          </Button>
        </div>
      </div>
      {isOpen && <ContactFormModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </Section>
  );
};
