import { Section } from '../ui/Section';
import React, { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { VectorRight } from '../icons';

type DonateHeroProps = {
  onDonateClick?: () => void;
};

export default function DonateHero({
  onDonateClick,
}: DonateHeroProps): JSX.Element {
  const t = useTranslations('donatePage');
  const DonateHeroText = t.raw('hero') as any;

  return (
    <Section
      withContainer={false}
      className="  bg-dots  min-h-150 lg:min-h-175 flex items-center "
    >
      <Container className="flex flex-col items-center max-w-4xl gap-8 text-center">
        <h1 className="text-h1">{DonateHeroText.title}</h1>
        <ul className="flex flex-wrap justify-center gap-8">
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
        <Button className="group" onClick={onDonateClick}>
          {DonateHeroText.heroButton}
          <VectorRight className="transition size-3 group-hover:translate-x-2" />
        </Button>
      </Container>
    </Section>
  );
}
