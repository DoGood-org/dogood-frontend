import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components';
import { useTranslations } from 'next-intl';
import Businesses from '@/assets/svg/businesses.svg';
import ngos from '@/assets/svg/ngos.svg';
import volunteers from '@/assets/svg/volunteers.svg';
import gooddeed from '@/assets/svg/medal.svg';
import Image from 'next/image';

export const OurEcosystem: React.FC = () => {
  const t = useTranslations('aboutPage');
  const OurEcosystem = t.raw('ourEcosystem') as any;

  const ECOSYSTEM_ITEMS = [
    {
      icon: volunteers,
      title: OurEcosystem.cards.Volunteers.title,
      description: OurEcosystem.cards.Volunteers.description,
    },
    {
      icon: ngos,
      title: OurEcosystem.cards.NGOsNonprofits.title,
      description: OurEcosystem.cards.NGOsNonprofits.description,
    },
    {
      icon: Businesses,
      title: OurEcosystem.cards.Businesses.title,
      description: OurEcosystem.cards.Businesses.description,
    },
    {
      icon: gooddeed,
      title: OurEcosystem.cards.EveryGoodDeed.title,
      description: OurEcosystem.cards.EveryGoodDeed.description,
    },
  ];

  return (
    <Section withContainer={false}>
      <Container className=" ">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-lg md:text-3xl lg:text-3xl  mb-4">
            {OurEcosystem.title}
          </h2>
          <p className="text-base md:text-md  max-w-[800px] mx-auto">
            {OurEcosystem.subTitle}
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-(--accent-bg) rounded-xl p-6 hover:bg-primary/15 transition-all hover:scale-105 gap-4 md:gap-6 flex flex-col  "
            >
              <Image src={item.icon} alt={item.title} />
              <h3 className="  text-white mb-3">{item.title}</h3>
              <p className="text-white/70  text-sm/6 font- ">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
