import React, { JSX } from 'react';
import { Section } from '../ui/Section';
import { Logo } from '../ui/Logo';
import { useTranslations } from 'next-intl';
import { Container } from '../ui/Container';

export default function WhySupportMatters(): JSX.Element {
  const t = useTranslations('donatePage');
  const supportText = t.raw('whySupportMatters') as any;

  return (
    <Section withContainer={true}>
      <Container className="flex  flex-col lg:flex-row gap-8 rounded-xl justify-between py-16 bg-[linear-gradient(45deg,#102024,#103738)] text-white">
        <div className="flex flex-col gap-4 not-lg:items-center not-lg:text-center">
          <Logo className="" />
          <h2 className="text-h2">{supportText.title}</h2>
        </div>
        <ul className="flex flex-col gap-6">
          {supportText.steps.map((step: any, index: number) => (
            <li
              key={step.title}
              className="flex items-center gap-4 px-6 py-3 rounded-full bg-border "
            >
              <p className="flex items-center justify-center text-2xl bg-white rounded-full h-15 min-w-15 text-border">
                {index + 1}
              </p>
              <div className="flex flex-col gap-2">
                <h4 className="text-md">{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
