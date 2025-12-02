import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components';

import whatWeDoImage from '@/assets/images/aboutPage/WhatWeDo.png';
import lock from '@/assets/svg/lock.svg';
import VectorTop from '@/assets/svg/VectorTop.svg';
import shield from '@/assets/svg/shield.svg';
import { useTranslations } from 'next-intl';

export const WhatWeDo: React.FC = () => {
  const t = useTranslations('aboutPage');
  const WhatWeDo = t.raw('whatWeDo') as any;

  const FEATURES = [
    {
      icon: shield,
      title: WhatWeDo.cards.card1.title,
      description: WhatWeDo.cards.card1.description,
    },
    {
      icon: lock,
      title: WhatWeDo.cards.card2.title,
      description: WhatWeDo.cards.card2.description,
    },
    {
      icon: VectorTop,
      title: WhatWeDo.cards.card3.title,
      description: WhatWeDo.cards.card3.description,
    },
  ];

  return (
    <Section withContainer={false}>
      <Container className="flex flex-col ">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl   mb-4">
            {WhatWeDo.title}
          </h2>
          <p className="text-base md:text-[20px]  max-w-200 mx-auto">
            {WhatWeDo.description}
          </p>
        </div>

        {/* Main Image */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 lg:mb-12 rounded-2xl overflow-hidden">
          <Image
            src={whatWeDoImage}
            alt="What we do"
            fill
            className="object-cover"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-[#6969690D]  shadow-md shadow-[#99999966] rounded-lg p-6  transition-colors"
            >
              <div className="text-4xl mb-4">
                <Image src={feature.icon} alt={feature.title} />
              </div>
              <h3 className="   mb-2">{feature.title}</h3>
              <p className="leading-base!  text-text-gray">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
