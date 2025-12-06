import React from 'react';
import Image from 'next/image';
import ourTeam from '@/assets/images/aboutPage/ourTeam.png';
import { Rocket } from '@/components/icons';
import { AboutHeart } from '@/components/icons';
import { Lamp } from '@/components/icons';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components';
import { useTranslations } from 'next-intl';

export const OurTeam: React.FC = () => {
  const t = useTranslations('aboutPage');
  const OurTeam = t.raw('ourTeam') as any;

  return (
    <Section withContainer={false}>
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch ">
        {/* Content */}
        <div>
          <h2 className="text-3xl md:text-3xl lg:text-3xl  mb-4">
            {OurTeam.title}
          </h2>
          <p className="text-base md:text-xl  mb-8 leading-relaxed">
            {OurTeam.description}
          </p>

          <ul className="flex flex-col gap-4 leading-8">
            <li className="flex items-center gap-4 ">
              <Lamp className="size-6" />
              <div>
                <h3 className=" mb-1">{OurTeam.list.item1.itemTitle}</h3>
                <p className="text-sm text-text-gray">
                  {OurTeam.list.item1.itemDescription}
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4 ">
              <Rocket className="size-6" />
              <div>
                <h3 className=" mb-1">{OurTeam.list.item1.itemTitle}</h3>
                <p className="text-sm text-text-gray">
                  {OurTeam.list.item1.itemDescription}
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4 ">
              <AboutHeart className="size-6" />
              <div>
                <h3 className=" mb-1">{OurTeam.list.item1.itemTitle}</h3>
                <p className="text-sm text-text-gray">
                  {OurTeam.list.item1.itemDescription}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
          <Image src={ourTeam} alt="Our Team" fill className="object-cover" />
        </div>
      </Container>
    </Section>
  );
};
