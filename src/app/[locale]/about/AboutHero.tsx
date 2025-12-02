'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import PlanetDesktop from '@/assets/images/aboutPage/PlanetDesck.png';
import Globe from '@/assets/svg/Globe.svg';
import CubeTransparent from '@/assets/svg/CubeTransparent.svg';
import ShieldChek from '@/assets/svg/ShieldCheck.svg';
import ShootingStar from '@/assets/svg/ShootingStar.svg';
import { Container } from '@/components';
import { Section } from '@/components/ui/Section';

export const AboutHero: React.FC = () => {
  const t = useTranslations('aboutPage');
  const aboutHeroText = t.raw('hero') as any;

  const VALUES = [
    { id: 'global', label: aboutHeroText.cards.global, icon: Globe },
    {
      id: 'transparent',
      label: aboutHeroText.cards.transparent,
      icon: CubeTransparent,
    },
    { id: 'trusted', label: aboutHeroText.cards.trusted, icon: ShieldChek },
    { id: 'impact', label: aboutHeroText.cards.impact, icon: ShootingStar },
  ];

  // const isMobile = useMediaQuery('(max-width: 767px)');
  // const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1440px)');

  // const heroImage = isMobile
  //   ? PlanetMobile
  //   : isTablet
  //     ? PlanetTablet
  //     : PlanetDesktop;

  return (
    <Section
      withContainer={false}
      className="relative min-h-[600px] lg:min-h-[700px] bg-background-secondary dark:bg-background   flex flex-col items-center justify-center overflow-hidden  text-white"
    >
      {/* Planet Background */}
      <div className=" relative sm:absolute min-w-[320px] min-h-[320px] max-w-[500px] md:max-w-full inset-0 m-auto flex items-center justify-center">
        <div className=" w-full h-full">
          <Image
            src={PlanetDesktop}
            alt="Planet Earth"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center p-4 flex flex-col items-center">
        <h1 className="md:text-5xl text-3xl  mb-4 lg:mb-6">
          {aboutHeroText.title}
        </h1>

        <p className="leading-[32px] md:text-[24px] lg:text-2xl text-[white/90] mb-8 max-w-200 mx-auto">
          <span className="text-[#00C1AC] font-semibold ">
            {aboutHeroText.highlight}
          </span>
          {aboutHeroText.metaDescription}
        </p>

        {/* Value Badges */}
        <div className="grid w-full max-w-[800px]   justify-items-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4  ">
          {VALUES.map((value) => (
            <div
              key={value.id}
              className="w-full sm:max-w-[190px] px-[24px] py-3 max-h-20 gap-2  h-full bg-(--accent-bg) rounded-[12px] text-white font-medium flex flex-col items-center justify-center"
            >
              <Image className="mr-2" src={value.icon} alt={value.label} />
              {value.label}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
