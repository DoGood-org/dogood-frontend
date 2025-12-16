'use client';

import { useMediaQuery } from '@/hooks';
import Image from 'next/image';
import { JSX } from 'react';
import bgMobile from '@/assets/images/cookies/bgMob.webp';
import bgTablet from '@/assets/images/cookies/bgTab.webp';
import bgDesktop from '@/assets/images/cookies/bgDesck.webp';
import bgDesktopLight from '@/assets/images/cookies/bgDescLight.webp';
import bgMobileLight from '@/assets/images/cookies/bgMobLight.webp';
import bgTabletLight from '@/assets/images/cookies/bgTabLight.webp';

export const BackgroundImage = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');

  const backgroundImage = isMobile ? bgMobile : isTablet ? bgTablet : bgDesktop;
  const backgroundImageLight = isMobile
    ? bgMobileLight
    : isTablet
      ? bgTabletLight
      : bgDesktopLight;

  return (
    <div className="absolute inset-0 top-[103px] md:top-[133px] lg:top-[200px] w-full overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Cookie background dark"
        sizes="(min-width: 1440px) 100vw, (min-width: 768px) 100vw, 100vw"
        priority
        className="object-cover object-top hidden dark:block w-full"
      />
      <Image
        src={backgroundImageLight}
        alt="Cookie background light"
        sizes="(min-width: 1440px) 100vw, (min-width: 768px) 100vw, 100vw"
        priority
        className="object-cover object-top dark:hidden w-full"
      />
    </div>
  );
};
