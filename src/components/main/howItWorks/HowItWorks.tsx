'use client';
import { Section } from '@/components';
import { getHowItWorks } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

export const HowItWorks: React.FC = () => {
  const t = useTranslations('howItWorks');
  const HOWITWORKS_LIST = getHowItWorks(t);

  return (
    <Section>
      <h2 className="text-h2 mb-6 lg:text-h2-d lg:mb-10">{t('title')}</h2>
      <ul className="flex flex-col gap-6 mx-auto w-full md:flex-row md:justify-center md:flex-wrap lg:flex-nowrap">
        {HOWITWORKS_LIST.map((item, index) => (
          <li
            key={index + item.title}
            className="bg-dots p-8 text-center rounded-xl border border-[#1AD3AA] md:w-[353px] lg:w-full lg:p-12"
          >
            <item.icon className="h-12 w-auto mx-auto mb-6 lg:w-[100px] lg:h-auto lg:mb-10" />
            <p className="text-base lg:text-lg">{item.title}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
};
