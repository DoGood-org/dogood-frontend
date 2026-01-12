import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import GoodBotSupport from '@/assets/images/aboutPage/supportPlanetImage.png';

export const SupportMission: React.FC = () => {
  const t = useTranslations('aboutPage');
  const SupportMission = t.raw('supportMission') as any;

  return (
    <Section withContainer={false}>
      <Container className=" items-stretch text-white  mt-20  relative  ">
        {/* Content */}
        <div className=" bg-background-secondary p-6  rounded-lg grid   gap-6 lg:gap-12  md:grid-cols-[2fr_1fr] ">
          <div className="order-2 lg:order-1 flex flex-col justify-center md:p-8 ">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-3xl lg:text-3xl   ">
                {SupportMission.title}
              </h2>
              <p className="text-base mb-8 leading-relaxed">
                {SupportMission.description}
              </p>
            </div>

            <div className="flex justify-end ">
              <Button className="  w-fit flex items-end ">
                <Link href="/donate">{SupportMission.buttonText}</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-end items-center w-full order-1 md:order-2 mb-4 lg:mb-0 lg:absolute lg:right-0 lg:top-0 lg:w-[490px] lg:pr-30 lg:-mt-15">
            <Image
              src={GoodBotSupport}
              alt="Support GoodBot"
              className="object-contain"
              width={490}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};
