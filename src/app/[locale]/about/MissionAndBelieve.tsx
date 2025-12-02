import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components';
import Image from 'next/image';

import heart from '@/assets/svg/Heart.svg';
import aboutStar from '@/assets/svg/AboutStar.svg';
import { useTranslations } from 'next-intl';

export const MissionAndBelieve: React.FC = () => {
  const t = useTranslations('aboutPage');
  const missionText = t.raw('ourMission') as any;

  return (
    <Section withContainer={false}>
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 px-12 py-6 max-w-6xl">
        {/* Our Mission */}
        <div className="bg-(--accent-bg)  rounded-xl p-6 ">
          <div className="flex flex-col  gap-3 mb-4">
            <span className="text-3xl">
              <Image src={heart} alt="Heart Icon" />
            </span>
            <h2 className="text-2xl   text-white">{missionText.title}</h2>
          </div>
          <p className="text-white/80 leading-relaxed">
            {missionText.description}
          </p>
        </div>

        {/* What We Believe */}
        <div className="bg-(--accent-bg) rounded-xl p-6">
          <div className="flex flex-col  gap-3 mb-4">
            <span className="text-3xl">
              <Image src={aboutStar} alt="Star Icon" />
            </span>
            <h2 className="text-2xl text-white">{missionText.title2}</h2>
          </div>
          <p className="text-white/80 leading-[24px] ">
            {missionText.description2}
          </p>
        </div>
      </Container>
    </Section>
  );
};
