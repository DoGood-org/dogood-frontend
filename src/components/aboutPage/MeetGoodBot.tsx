import Image from 'next/image';

import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

import GoodBotImage from '@/assets/images/aboutPage/meetGoodBot.png';
import { Connect } from '@/components/icons';
import { Verify } from '@/components/icons';
import { VectorTop } from '@/components/icons';
import { AboutStar } from '@/components/icons';

import { useTranslations } from 'next-intl';

const MeetGoodBotList = [
  { icon: Connect, text: 'item1' },
  { icon: Verify, text: 'item2' },
  { icon: AboutStar, text: 'item3' },
  { icon: VectorTop, text: 'item4' },
];

export const MeetGoodBot: React.FC = () => {
  const t = useTranslations('aboutPage');
  const meetGoodBot = t.raw('meetGoodBot') as any;

  return (
    <Section withContainer={false} className="bg-background">
      <Container className="flex lg:px-12 lg:max-w-6xl  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  lg:gap-6 items-center">
          <div className="relative bg-card w-full h-full   rounded-lg flex items-center justify-center ">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] ">
              <Image
                src={GoodBotImage}
                alt="GoodBot Character"
                fill
                sizes="300"
                className="object-contain"
              />
            </div>
          </div>

          <div className="bg-card  rounded-lg h-full p-8">
            <h2 className="text-xl md:text-xl lg:text-3xl  mb-4">
              {meetGoodBot.title}
            </h2>
            <p className=" lg:text-xl   mb-8 leading-[32px]">
              {meetGoodBot.description}
            </p>

            <ul className="space-y-7">
              {MeetGoodBotList.map((item) => (
                <li key={item.text} className="flex  items-center gap-6">
                  <item.icon className="size-6" />
                  <p>{meetGoodBot.list[item.text]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
};
