'use client';
import { getTransparencyAndTrustGrants } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Section } from '../ui/Section';
import GrantsMob from '@/assets/images/grants/GrantsMob.jpg';
import GrantsTabl from '@/assets/images/grants/GrantsTabl.jpg';
import GrantsDesk from '@/assets/images/grants/GrantsDesk.jpg';
import Image from 'next/image';
import { useResponsiveImage } from '@/hooks/useResponsiveImage';

export const TransparencyAndTrust = (): React.JSX.Element => {
  const t = useTranslations('grantsPage');
  const TRANSPARENCYANDTRUST_LIST = getTransparencyAndTrustGrants(t);
  const {
    image: heroImage,
    isMobile,
    isTablet,
  } = useResponsiveImage({
    mobile: GrantsMob,
    tablet: GrantsTabl,
    desktop: GrantsDesk,
  });
  const getDimensions = (): {
    width: number;
    height: number;
  } => {
    if (isMobile) return { width: 353, height: 320 };
    if (isTablet) return { width: 584, height: 568 };
    return { width: 571, height: 568 };
  };

  const { width, height } = getDimensions();
  return (
    <Section>
      <h2 className="text-h2-m text-center mb-4 md:text-h2 md:mb-6">
        {t('titleOfTransparency')}
      </h2>
      <div className="lg:flex lg:gap-7.5">
        <Image
          src={heroImage}
          alt="Hero image"
          width={width}
          height={height}
          className="mb-5 mx-auto md:mb-8 lg:flex-1 rounded-3xl"
        />
        <div className="lg:p-8 lg:flex lg:flex-1">
          <ul className="flex flex-col gap-4 md:gap-12">
            {TRANSPARENCYANDTRUST_LIST.map((item, index) => (
              <li key={index + item.title} className="flex gap-3 md:gap-6">
                <div className="w-6">
                  {item.icon && <item.icon className="w-6 h-6 lg:w-8 lg:h-8" />}
                </div>
                <div className="flex flex-col gap-2 justify-start md:gap-4">
                  <h3 className="text-sm md:text-h3 text-start">
                    {item.title}
                  </h3>
                  <p className="text-[12px] leading-5 md:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};
