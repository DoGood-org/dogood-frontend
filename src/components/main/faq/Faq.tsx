'use client';

import Line6 from '@/components/icons/Line6';
import React from 'react';
import { Section } from '../../ui/Section';
import { ContactForm } from './ContactForm';
import { useTranslations } from 'next-intl';

export const Faq = (): React.JSX.Element => {
  const t = useTranslations('faq');
  const contact = (t.raw('contact') as any[])[0];
  const downText = (t.raw('downtext') as any[])[0];

  return (
    <Section className="relative">
      <div className="absolute inset-0 z-6 pointer-events-none">
        <Line6 className="w-full h-full" preserveAspectRatio="xMidYMid slice" />
      </div>
      <ContactForm buttonTxt={downText.btn} title={contact.heading} />
    </Section>
  );
};
