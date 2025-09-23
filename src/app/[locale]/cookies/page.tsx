'use client';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { useTranslations } from 'next-intl';

type Category = {
  title: string;
  description: string;
  examples?: {
    type: string;
    description: string;
  }[];
  moreInfo?: string;
};

const Cookies: React.FC = () => {
  const t = useTranslations('cookies');

  const categories = t.raw('categories') as Category[];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <Accordion type="single" collapsible>
        {categories.map((cat, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{cat.title}</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">{cat.description}</p>

              {cat.examples && (
                <ul className="list-disc pl-5 space-y-1">
                  {cat.examples.map((ex: any, i: number) => (
                    <li key={i}>
                      <strong>{ex.type}:</strong> {ex.description}
                    </li>
                  ))}
                </ul>
              )}

              {cat.moreInfo && <p className="mt-2 italic">{cat.moreInfo}</p>}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Cookies;
