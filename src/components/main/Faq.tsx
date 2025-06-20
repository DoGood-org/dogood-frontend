'use client';

import React from 'react';
import ContactForm from '../faq/ContactForm';
import Line6 from '@/components/icons/Line6';
import { Section } from '../ui/Section';

const Faq = (): React.JSX.Element => {
  return (
    <Section className="relative">
      <div className="absolute inset-0 z-6 pointer-events-none">
        <Line6 />
      </div>
      <ContactForm />
    </Section>
  );
};

export default Faq;
