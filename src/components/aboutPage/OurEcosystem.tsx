import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components';
import { useTranslations } from 'next-intl';
import { Businesses } from '@/components/icons';
import { Ngos } from '@/components/icons';
import { Volunteers } from '@/components/icons';
import { Medal } from '@/components/icons';

export const OurEcosystem: React.FC = () => {
  const t = useTranslations('aboutPage');
  const OurEcosystem = t.raw('ourEcosystem') as any;

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

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <li className="bg-(--accent-bg) rounded-xl p-6 hover:bg-primary/15 transition-all hover:scale-105 gap-4  flex flex-col  ">
            <Volunteers className="size-8" />
            <h3 className="  text-white pb-2 ">
              {OurEcosystem.cards.Volunteers.title}
            </h3>
            <p className="text-white/70  text-sm/6 font- ">
              {OurEcosystem.cards.Volunteers.description}
            </p>
          </li>
          <li className="bg-(--accent-bg) rounded-xl p-6 hover:bg-primary/15 transition-all hover:scale-105 gap-4  flex flex-col  ">
            <Ngos className="size-8" />
            <h3 className="  text-white pb-2 ">
              {OurEcosystem.cards.NGOsNonprofits.title}
            </h3>
            <p className="text-white/70  text-sm/6 font- ">
              {OurEcosystem.cards.NGOsNonprofits.description}
            </p>
          </li>
          <li className="bg-(--accent-bg) rounded-xl p-6 hover:bg-primary/15 transition-all hover:scale-105 gap-4  flex flex-col  ">
            <Businesses className="size-8" />
            <h3 className="  text-white pb-2 ">
              {OurEcosystem.cards.Businesses.title}
            </h3>
            <p className="text-white/70  text-sm/6 font- ">
              {OurEcosystem.cards.Businesses.description}
            </p>
          </li>
          <li className="bg-(--accent-bg) rounded-xl p-6 hover:bg-primary/15 transition-all hover:scale-105 gap-4  flex flex-col  ">
            <Medal className="size-8" />
            <h3 className="  text-white pb-2 ">
              {OurEcosystem.cards.EveryGoodDeed.title}
            </h3>
            <p className="text-white/70  text-sm/6 font- ">
              {OurEcosystem.cards.EveryGoodDeed.description}
            </p>
          </li>
        </ul>
      </Container>
    </Section>
  );
};
