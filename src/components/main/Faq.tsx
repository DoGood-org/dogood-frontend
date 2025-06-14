'use client';

import React from 'react';
import ContactForm from '../faq/ContactForm';
import { Container } from '../ui/Container';
import Line6 from '@/components/icons/Line6';

const Faq = (): React.JSX.Element => {
  return (
    <section className="relative bg-background mx-auto w-full py-[100px] overflow-hidden">
      <div className="absolute inset-0 z-6 pointer-events-none">
        <Line6 />
      </div>
      <Container>
        <div className="flex flex-col p-[20px] md:p-[60px] justify-center sm:py-0 gap-[60px] sm:flex-col-reverse xl:flex-row">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
};

export default Faq;
