import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components';

import whatWeDoImage from '@/assets/images/aboutPage/WhatWeDo.png';
import { Lock } from '@/components/icons';
import { Shield } from '@/components/icons';
import { VectorTop } from '@/components/icons';

import { useTranslations } from 'next-intl';

export const WhatWeDo: React.FC = () => {
  const t = useTranslations('aboutPage');
  const WhatWeDo = t.raw('whatWeDo') as any;

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

        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 lg:mb-12 rounded-2xl overflow-hidden">
          <Image
            src={whatWeDoImage}
            alt="What we do"
            fill
            className="object-cover"
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="bg-[#6969690D]  shadow-md shadow-[#99999966] rounded-lg p-6  transition-colors">
            <Shield className="size-6 mb-4" />
            <h3 className="   mb-2">{WhatWeDo.cards.card1.title}</h3>
            <p className="leading-base!  text-text-gray">
              {WhatWeDo.cards.card1.description}
            </p>
          </li>
          <li className="bg-[#6969690D]  shadow-md shadow-[#99999966] rounded-lg p-6  transition-colors">
            <Lock className="size-6 mb-4" />
            <h3 className="   mb-2">{WhatWeDo.cards.card2.title}</h3>
            <p className="leading-base!  text-text-gray">
              {WhatWeDo.cards.card2.description}
            </p>
          </li>
          <li className="bg-[#6969690D]  shadow-md shadow-[#99999966] rounded-lg p-6  transition-colors">
            <VectorTop className="size-6 mb-4" />
            <h3 className="   mb-2">{WhatWeDo.cards.card3.title}</h3>
            <p className="leading-base!  text-text-gray">
              {WhatWeDo.cards.card3.description}
            </p>
          </li>
        </ul>
      </Container>
    </Section>
  );
};
