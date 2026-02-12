import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

import whatWeDoImage from '@/assets/images/aboutPage/WhatWeDo.png';
import { Lock } from '@/components/icons';
import { Shield } from '@/components/icons';
import { VectorTop } from '@/components/icons';

import { useTranslations } from 'next-intl';

const whatWeDoList = [
  { icon: Shield, text: 'card1' },
  { icon: Lock, text: 'card2' },
  { icon: VectorTop, text: 'card3' },
];

export const WhatWeDo: React.FC = () => {
  const t = useTranslations('aboutPage');
  const WhatWeDo = t.raw('whatWeDo') as any;

  return (
    <Section withContainer={false}>
      <Container className="flex flex-col items-center ">
        <div className="text-center mb-8 ">
          <h2 className="text-3xl md:text-4xl lg:text-5xl   mb-4">
            {WhatWeDo.title}
          </h2>
          <p className="text-base md:text-[20px]  max-w-200 mx-auto">
            {WhatWeDo.description}
          </p>
        </div>

        <div className="relative w-full h-[400px] md:h-[400px] lg:h-[500px] mb-8 lg:mb-12 rounded-2xl overflow-hidden">
          <Image
            src={whatWeDoImage}
            alt="What we do"
            fill
            sizes="300"
            className="object-cover"
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-6xl">
          {whatWeDoList.map((item) => (
            <li
              key={item.text}
              className="bg-[#6969690D]  shadow-md shadow-[#99999966] rounded-lg p-6  transition-colors"
            >
              <item.icon className="size-6 mb-4" />
              <h3 className="   mb-2">{WhatWeDo.cards[item.text].title}</h3>
              <p className="leading-base!  text-text-gray">
                {WhatWeDo.cards[item.text].description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
