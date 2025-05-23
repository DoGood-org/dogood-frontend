import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
// import Image from 'next/image';

export default function Faq() {
  return (
    <section className="w-full">
      <div className="max-w-[1920px] ">
        <h2 className="text-[32px] text-black flex justify-center">FAQ</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-xl mx-auto space-y-2"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black">
              How it works?
            </AccordionTrigger>
            <AccordionContent className="text-black">
              Using DoGood is simple and rewarding: Submit or browse a request —
              whether it’s groceries for someone in need, supporting a cause, or
              offering your skills. Respond to a request — as an individual, a
              volunteer, a business, or part of an organization.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-black">
              Where can I track my progress?
            </AccordionTrigger>
            <AccordionContent className="text-black">
              You can track your progress in our telegram channel, as well as we
              will present every block what we have done, and what we will do in
              the future.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
