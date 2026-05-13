'use client';

import { Section } from '../ui/Section';
import React, { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { VectorRight } from '../icons';
import { donationModalStore } from '@/zustand/stores/donationModalStore';

export default function DonateHero(): JSX.Element {
  const t = useTranslations('donatePage');
  const donateHeroText = t.raw('hero') as any;
  const open = donationModalStore((s) => s.open);

  return (
    <Section
      withContainer={false}
      className="flex items-center bg-dots min-h-150 lg:min-h-175"
    >
      <Container className="flex flex-col items-center max-w-4xl gap-8 text-center">
        <h1 className="text-h1">{donateHeroText.title}</h1>
        <ul className="flex flex-wrap justify-center gap-8">
          {donateHeroText.subTitle.map((item: string) => (
            <li key={item} className="list-disc marker:text-border">
              {item}
            </li>
          ))}
        </ul>
        <Button className="group" onClick={open}>
          {donateHeroText.heroButton}
          <VectorRight className="transition size-3 group-hover:translate-x-2" />
        </Button>
      </Container>
    </Section>
  );
}
