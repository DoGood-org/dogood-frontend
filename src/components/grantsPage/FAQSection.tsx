'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Section } from '../ui/Section';
import { AccordionData } from '../supportPage/AccordionData';
import { Slider } from '@/components/ui/Slider';

export const FAQSection = (): React.JSX.Element => {
  const t = useTranslations('grantsPage');
  const allData = t.raw('questions');

  const itemsPerSlide = 6;

  const slides = [];
  for (let i = 0; i < allData.items.length; i += itemsPerSlide) {
    slides.push({
      id: i,
      items: allData.items.slice(i, i + itemsPerSlide),
    });
  }

  return (
    <Section>
      <h2 className="text-h2-m text-center mb-4 md:mb-8 lg:mb-10 lg:text-h2">
        {t('questions.title')}
      </h2>

      <Slider
        items={slides}
        itemsPerSlide={1}
        renderItem={(slide) => (
          <AccordionData
            categoryData={{
              items: slide.items,
            }}
          />
        )}
        listClassName="w-full"
      />
    </Section>
  );
};
