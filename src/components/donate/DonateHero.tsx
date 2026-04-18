import { Section } from '../ui/Section';
import React, { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { VectorRight } from '../icons';

export default function DonateHero(): JSX.Element {
  const t = useTranslations('donatePage');
  const DonateHeroText = t.raw('hero') as any;

  return (
    <Section
      withContainer={false}
      className="  bg-dots  min-h-[600px] lg:min-h-[700px] flex items-center "
    >
      <Container className="flex flex-col items-center gap-8 max-w-4xl text-center">
        <h1 className="text-h1">{DonateHeroText.title}</h1>
        <ul className="flex gap-8 flex-wrap justify-center">
          <li className="list-disc marker:text-[#2C8C8C]">
            {DonateHeroText.subTitle.subOne}
          </li>
          <li className="list-disc marker:text-[#2C8C8C]">
            {DonateHeroText.subTitle.subTwo}
          </li>
          <li className="list-disc marker:text-[#2C8C8C]">
            {DonateHeroText.subTitle.subThree}
          </li>
        </ul>
        <Button className="group">
          {DonateHeroText.heroButton}
          <VectorRight className="size-3 group-hover:translate-x-2 transition" />
        </Button>
      </Container>
    </Section>
  );
}
