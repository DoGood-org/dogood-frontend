'use client';

import Line6 from '@/components/icons/Line6';
import React from 'react';
import { Section } from '../../ui/Section';
import { ContactForm } from './ContactForm';

export const Faq = (): React.JSX.Element => {
  return (
    <Section className="relative">
      <div className="absolute inset-0 z-6 pointer-events-none">
        <Line6 className="w-full h-full" preserveAspectRatio="xMidYMid slice" />
      </div>
      <ContactForm />
    </Section>
  );
};
