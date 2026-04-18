import React, { JSX } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '../ui/Section';
import iphoneImage from '@/assets/images/donatePage/iPhone15.png';
import Link from 'next/link';
import { Container } from '../ui/Container';
export default function DonateSteps(): JSX.Element {
  const t = useTranslations('donatePage');
  const donateText = t.raw('steps') as any;

  const steps = [
    {
      number: 1,
      title: donateText.stepOne.title,
      description: donateText.stepOne.description,
      sub: donateText.stepOne.sub,
      subLink: donateText.stepOne.subLink,
    },
    {
      number: 2,
      title: donateText.stepTwo.title,
      description: donateText.stepTwo.description,
    },
    {
      number: 3,
      title: donateText.stepThree.title,
      description: donateText.stepThree.description,
    },
  ];

  return (
    <Section withContainer={false} className="">
      <Container className="flex flex-col items-center">
        {/* Фото на мобільних */}
        <Image
          src={iphoneImage}
          alt="Description"
          className="lg:hidden mb-8 order-1"
          width={419}
          height={615}
        />

        {/* Заголовок */}
        <h2 className="sm:text-h2 text-2xl text-center mb-8 mt-20 order-2 lg:order-1">
          {donateText.title}
        </h2>

        {/* Блок з фото та кроками на десктопі */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 order-3 lg:order-2">
          <Image
            src={iphoneImage}
            alt="Description"
            className="hidden lg:block"
            width={419}
            height={615}
          />
          <ul className="flex flex-col gap-16 max-w-xl">
            {steps.map((step) => (
              <li key={step.number} className="flex flex-col gap-2 text-base">
                <span className="flex justify-center items-center border border-foreground rounded-full w-8 h-8">
                  {step.number}
                </span>
                <p className="text-md">{step.title}</p>
                <p className="text-md text-gray-500">{step.description}</p>
                {step.sub && (
                  <p className="text-sm text-gray-500 font-bold md:font-medium">
                    {step.sub}
                    <Link href="#" className="border-b border-gray-500 ">
                      {step.subLink}
                    </Link>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
