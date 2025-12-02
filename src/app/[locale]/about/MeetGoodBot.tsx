import React from 'react';
import Image from 'next/image';

import { Section } from '@/components/ui/Section';
import { Container } from '@/components';

import GoodBotImage from '@/assets/images/aboutPage/meetGoodBot.png';
import connect from '@/assets/svg/connect.svg';
import verify from '@/assets/svg/Verify.svg';
import VectorTop from '@/assets/svg/VectorTop.svg';
import AboutStar from '@/assets/svg/AboutStar.svg';
import { useTranslations } from 'next-intl';

export const MeetGoodBot: React.FC = () => {
  const t = useTranslations('aboutPage');
  const meetGoodBot = t.raw('meetGoodBot') as any;

  console.log(meetGoodBot);

  const FEATURES = [
    {
      icon: connect,
      text: meetGoodBot.list.item1,
    },
    {
      icon: verify,
      text: meetGoodBot.list.item2,
    },
    {
      icon: AboutStar,
      text: meetGoodBot.list.item3,
    },
    {
      icon: VectorTop,
      text: meetGoodBot.list.item4,
    },
  ];
  return (
    <Section withContainer={false} className="bg-background">
      <Container className="flex px-12 max-w-6xl  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  lg:gap-6 items-center">
          {/* GoodBot Image */}
          <div className="relative bg-card w-full h-full   rounded-lg flex items-center justify-center ">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] ">
              <Image
                src={GoodBotImage}
                alt="GoodBot Character"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-card  rounded-lg h-full p-8">
            <h2 className="text-xl md:text-xl lg:text-3xl  mb-4">
              {meetGoodBot.title}
            </h2>
            <p className=" lg:text-xl   mb-8 leading-[32px]">
              {meetGoodBot.description}
            </p>

            {/* Features List */}
            <ul className="space-y-7">
              {FEATURES.map((feature, index) => (
                <li key={index} className="flex  items-center gap-3">
                  <span className=" shrink-0">
                    <Image src={feature.icon} alt={feature.text} />
                  </span>
                  <p className="">{feature.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
};
