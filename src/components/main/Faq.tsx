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
const Faq = (): React.JSX.Element => {
  const t = useTranslations('faq');
  const faqItems = t.raw('faq') as { question: string; answer: string[] }[];
  return (
    <section className="my-container w-full bg-background relative z-25 py-[100px]">
      <div className="max-w-[1920px] mx-auto px-[20px] lg:px-[100px] items-center flex flex-col ">
        <h2 className="text-[32px] text-foreground flex justify-center pb-[40px]">
          FAQ
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-xl mx-auto space-y-2 pb-[65px] md:pb-[100px]"
        >
          {faqItems.map(({ question, answer }, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-3">{answer[0]}</p>
                {answer.length > 1 && (
                  <ul className="list-disc pl-5 space-y-2">
                    {answer.slice(1).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="bg-card rounded-[10px] md:p-[60px] lg:bg-transparent">
          <div className=" flex justify-center lg:py-[100px] md:py-0 gap-[30px] md:flex-col-reverse lg:flex-row">
            <ContactForm />
            <div className="hidden md:block">
              <Image
                src={FaqImg}
                alt="Logo"
                className="md:w-[949px] h-auto lg:max-w-[993px] max-h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Faq;
