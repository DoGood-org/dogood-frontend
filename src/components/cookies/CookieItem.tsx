'use client';

import { JSX } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { CaretDown } from '@/components/icons';
import { Category } from '@/types/cookiesType';
import { ComponentsList } from './ComponentsList';
import { parseRichText } from '@/lib/parsRichText';

export const CookieItem = ({
  cookieItem,
  withLine = true,
}: {
  cookieItem: Category;
  withLine?: boolean;
}): JSX.Element => {
  const { title, description, examples, moreInfo, components, contacts } =
    cookieItem;

  return (
    <AccordionItem key={title} value={title} className="mb-2">
      <AccordionTrigger className="group text-start block">
        <h2 className="text-[20px] leading-6 md:text-h2-m">{title}</h2>
        <div className="flex gap-2 items-center">
          <hr className="w-full border-t-1 md:border-t-2 border-foreground" />
          <CaretDown
            className={`size-4 md:size-8 stroke-current group-data-[state=open]:rotate-180 transition-transform duration-700 size-3 translate-y-0.5 transition-transform duration-200
            `}
          />
        </div>
      </AccordionTrigger>
      <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        {typeof description == 'string' && (
          <p className="font-light whitespace-pre-line">
            {parseRichText(description)}
          </p>
        )}
        {examples && (
          <ul className="list-disc">
            {examples.map((example, id) => (
              <li key={id} className="mt-8 ml-8 font-light">
                <p className="whitespace-pre-line">
                  <b className="font-semibold mr-2">{example.type}</b>
                  {withLine && <span className="mr-2">-</span>}
                  {parseRichText(example.description)}
                </p>
              </li>
            ))}
          </ul>
        )}
        {contacts && (
          <ul className="list-disc mt-8">
            {contacts.map((contact, id) => (
              <li key={`${contact.type}-${id}`} className="ml-8 font-light">
                <p>
                  <strong className="font-semibold mr-2">{contact.type}</strong>
                  {contact.description}
                </p>
              </li>
            ))}
          </ul>
        )}
        {moreInfo && (
          <p className="mt-8 font-light whitespace-pre-line">
            {parseRichText(moreInfo)}
          </p>
        )}
        {components && (
          <ul className="space-y-8">
            {components.map((component) => (
              <ComponentsList key={component.type} component={component} />
            ))}
          </ul>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
