'use client';
import React from 'react';
import { Accordion } from '@/components/ui/Accordion';
import { useTranslations } from 'next-intl';
import Line6 from '@/components/icons/Line6';
import BackToTopButton from '@/components/ui/BackToTopButton';
import CategoryItem, { Category } from '@/components/ui/CategoryItem';
import { Container } from '@/components/ui/Container';

const Cookies: React.FC = () => {
  const t = useTranslations('cookies');
  const categories = t.raw('categories') as Category[];
  const [accordionOpen, setAccordionOpen] = React.useState(false);

  const handleAccordionChange = (
    value: string | string[] | undefined
  ): void => {
    if (Array.isArray(value)) {
      setAccordionOpen(value.length > 0);
    } else {
      setAccordionOpen(!!value);
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <Line6
        className="pointer-events-none select-none fixed top-0 left-0 w-full h-full z-[-1]"
        style={{ objectFit: 'cover' }}
        aria-hidden="true"
      />
      <Container>
        <div className="relative z-10 space-y-4">
          <h3 className="text-[32px] leading-[48px] font-light m-0 pb-[24px] md:text-[40px] md:leading-[50px] lg:text-[48px] lg:leading-[64px] lg:pb-[80px]">
            {t('title')}
          </h3>

          <Accordion
            type="single"
            collapsible
            onValueChange={handleAccordionChange}
          >
            {categories.map((cat, index) => (
              <CategoryItem cat={cat} index={index} key={cat.title || index} />
            ))}
          </Accordion>
          <BackToTopButton show={accordionOpen} />
        </div>
      </Container>
    </div>
  );
};

export default Cookies;
