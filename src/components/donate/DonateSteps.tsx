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
        <Image
          src={iphoneImage}
          alt="Description"
          className="order-1 mb-8 lg:hidden"
          width={419}
          height={615}
        />

        <h2 className="order-2 mt-20 mb-8 text-2xl text-center sm:text-h2 lg:order-1">
          {donateText.title}
        </h2>

        <div className="flex flex-col items-center justify-center order-3 gap-8 lg:flex-row lg:order-2">
          <Image
            src={iphoneImage}
            alt="Description"
            className="hidden lg:block"
            width={419}
            height={615}
          />
          <ul className="flex flex-col max-w-xl gap-16">
            {steps.map((step) => (
              <li key={step.number} className="flex flex-col gap-2 text-base">
                <span className="flex items-center justify-center w-8 h-8 border rounded-full border-foreground">
                  {step.number}
                </span>
                <p className="text-md">{step.title}</p>
                <p className="text-gray-500 text-md">{step.description}</p>
                {step.sub && (
                  <p className="text-sm font-bold text-gray-500 md:font-medium">
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
