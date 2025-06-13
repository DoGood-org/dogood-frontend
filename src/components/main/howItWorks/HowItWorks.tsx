'use client';
import { Container } from '@/components/ui/Container';
import { getHowItWorks } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

export const HowItWorks: React.FC = () => {
  const t = useTranslations('howItWorks');
  const HOWITWORKS_LIST = getHowItWorks(t);

  return (
    <section className="bg-background pt-15">
      <Container>
        <h2 className="text-[32px] mb-6">{t('title')}</h2>
        <ul className="flex flex-col gap-6 md:flex-row mx-auto">
          {HOWITWORKS_LIST.map((item, index) => (
            <li
              key={index + item.title}
              className="bg-gradient-to-tr from-[rgba(26,211,170,0.8)] via-[rgba(0,0,0,0.5)] to-[rgba(26,211,170,0.8)] p-8 text-center rounded-xl border border-[#1AD3AA]"
            >
              <item.icon className="stroke-foreground h-12 w-12 mx-auto mb-6" />
              <h3 className="">{item.title}</h3>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
