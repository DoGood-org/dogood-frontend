import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import FaqImg from '@/assets/images/faq/image-6.png';
import ContactForm from '../faq/ContactForm';
import { Container } from '../ui/Container';
const Faq = (): React.JSX.Element => {
  const t = useTranslations('faq');
  const faqItems = t.raw('faq') as { question: string; answer: string[] }[];
  return (
    <section className="mx-auto w-full bg-background relative z-25 py-[100px]">
      <Container>
        <div className="flex flex-col ">
          <h2 className="text-h5-m font-bold md:text-h2-d semibold lg:text-h2-d semibold pb-[30px] text-foreground flex justify-center lg:pb-[40px]">
            FAQ
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full mx-auto max-w-4xl space-y-2 pb-[65px] md:pb-[100px]"
          >
            {faqItems.map(({ question, answer }, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-h4-d font-semibold md:text-h3-d lg:text-h3-d">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-p3-m font-normal">
                  <p className="text-p3-m font-normal mt-[30px] mb-3">
                    {answer[0]}
                  </p>
                  {answer.length > 1 && (
                    <ul className="roboto text-p3-m font-normal list-disc pl-5 space-y-2">
                      {answer.slice(1).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="bg-card rounded-[10px] p-[20px] md:p-[60px]">
            <div className=" flex justify-center sm:py-0 gap-[60px] sm:flex-col-reverse">
              <ContactForm />
              <div className="hidden sm:block">
                <Image
                  src={FaqImg}
                  alt="Logo"
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Faq;
