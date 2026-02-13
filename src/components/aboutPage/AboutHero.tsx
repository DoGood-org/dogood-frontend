'use client';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import PlanetDesktop from '@/assets/images/aboutPage/PlanetDesck.png';
import { Globe } from '@/components/icons';
import { CubeTransparent } from '@/components/icons';
import { ShieldCheck } from '@/components/icons';
import { ShootingStar } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

const HeroList = [
  { icon: Globe, text: 'global' },
  { icon: CubeTransparent, text: 'transparent' },
  { icon: ShieldCheck, text: 'trusted' },
  { icon: ShootingStar, text: 'impact' },
];

export const AboutHero: React.FC = () => {
  const t = useTranslations('aboutPage');
  const aboutHeroText = t.raw('hero') as any;

  return (
    <Section
      withContainer={false}
      className="relative min-h-[600px] lg:min-h-[700px] bg-background-secondary dark:bg-background   flex flex-col items-center justify-center overflow-hidden  text-white"
    >
      <div className="relative sm:absolute w-70 h-70 sm:w-full sm:h-full max-w-125 md:max-w-full sm:inset-0 sm:m-auto flex items-center justify-center">
        <div className="w-full h-full relative">
          <Image
            src={PlanetDesktop}
            alt="Planet Earth"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

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

        <ul className="grid w-full max-w-[800px]   justify-items-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4  ">
          {HeroList.map((item) => (
            <li
              key={item.text}
              className="w-full sm:max-w-[190px] px-[24px] py-3 max-h-20 gap-2  h-full bg-(--accent-bg) rounded-[12px] text-white font-medium flex flex-col items-center justify-center "
            >
              <item.icon className="size-8" />
              {aboutHeroText.cards[item.text]}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
