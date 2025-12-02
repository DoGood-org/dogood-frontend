import React from 'react';
import Image from 'next/image';
import ourTeam from '@/assets/images/aboutPage/ourTeam.png';
import rocket from '@/assets/svg/rocket.svg';
import heart from '@/assets/svg/Heart.svg';
import lamp from '@/assets/svg/lamp.svg';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components';
import { useTranslations } from 'next-intl';

export const OurTeam: React.FC = () => {
  const t = useTranslations('aboutPage');
  const OurTeam = t.raw('ourTeam') as any;

  const TEAM_VALUES = [
    {
      icon: lamp,
      title: OurTeam.list.item1.itemTitle,
      description: OurTeam.list.item1.itemDescription,
    },
    {
      icon: rocket,
      title: OurTeam.list.item2.itemTitle,
      description: OurTeam.list.item2.itemDescription,
    },
    {
      icon: heart,
      title: OurTeam.list.item3.itemTitle,
      description: OurTeam.list.item3.itemDescription,
    },
  ];
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

          {/* Values List */}
          <div className="flex flex-col gap-4 leading-8">
            {TEAM_VALUES.map((value, index) => (
              <div key={index} className="flex items-center gap-4 ">
                <Image
                  src={value.icon}
                  alt={value.title}
                  className="text-2xl flex-shrink-0"
                />
                <div>
                  <h3 className=" mb-1">{value.title}</h3>
                  <p className="text-sm text-text-gray">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Image */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
          <Image src={ourTeam} alt="Our Team" fill className="object-cover" />
        </div>
      </Container>
    </Section>
  );
};
