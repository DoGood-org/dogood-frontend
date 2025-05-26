import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { useTranslations } from 'next-intl';
import ContactForm from '../faq/СontactForm';
import Image from 'next/image';
import FaqImg from '@/assets/images/faq/image-6.png';

export default function Faq() {
  const t = useTranslations('faq');
  const faqItems = t.raw('faq') as { question: string; answer: string[] }[];
  return (
    <section className="w-full bg-background relative z-25 py-[100px]">
      <div className="max-w-[1920px] mx-auto px-[20px] lg:px-[100px] items-center flex flex-col ">
        <h2 className="text-[32px] text-foreground flex justify-center pb-[40px]">
          FAQ
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-xl mx-auto space-y-2"
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
        <div className=" flex justify-center py-[100px] gap-[30px] md:flex-col-reverse lg:flex-row">
          <ContactForm />
          <div className="hidden lg:block">
            <Image
              src={FaqImg}
              alt="Logo"
              className="max-w-[993px] max-h-[663px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
