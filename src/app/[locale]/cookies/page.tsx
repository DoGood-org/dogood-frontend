'use client';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { useTranslations } from 'next-intl';
import { Container } from '@/components';
import Line6 from '@/components/icons/Line6';
import BackToTopButton from '@/components/ui/BackToTopButton';

type Example = {
  type: string;
  description: string;
};

type Category = {
  title: string;
  description: string | Example[];
  examples?: Example[];
  moreInfo?: string;
};

function renderBlock(block: any, key?: React.Key): React.ReactNode {
  if (typeof block === 'string') {
    return (
      <p key={key} className="whitespace-pre-line break-words">
        {block}
      </p>
    );
  }
  if (Array.isArray(block)) {
    return (
      <div key={key} className="mb-2 space-y-2">
        {block.map((item, idx) =>
          renderBlock(item, key ? `${key}-${idx}` : idx)
        )}
      </div>
    );
  }
  return (
    <li key={key} className="mb-2 list-disc">
      {block.title && (
        <h4 className="text-xl font-semibold mt-4 mb-2">{block.title}</h4>
      )}
      {block.heading && (
        <p className="text-[16px] font-bold leading-[24px] mt-3 mb-2">
          {block.heading}
        </p>
      )}
      {block.paragraph && (
        <p className="mb-2 whitespace-pre-line break-words">
          {block.paragraph}
        </p>
      )}
      {block.type && <strong>{block.type}</strong>}
      {block.content && <span> {block.content}</span>}
      {block.content2 && (
        <p className="mb-2 whitespace-pre-line break-words">{block.content2}</p>
      )}
      {block.content3 && (
        <p className="mb-2 whitespace-pre-line break-words">{block.content3}</p>
      )}
      {block.content4 && (
        <p className="mb-2 whitespace-pre-line break-words">{block.content4}</p>
      )}
      {block.description && typeof block.description === 'string' && (
        <p className="mb-2 whitespace-pre-line break-words">
          {block.description}
        </p>
      )}
      {block.description && Array.isArray(block.description) && (
        <div className="mb-2 space-y-2">
          {block.description.map((desc: any, idx: number) =>
            renderBlock(desc, key ? `${key}-desc-${idx}` : `desc-${idx}`)
          )}
        </div>
      )}
      {block.examples &&
        Array.isArray(block.examples) &&
        block.examples.length > 0 && (
          <ul className="pl-5 space-y-1">
            {block.examples.map((ex: any, i: number) => (
              <li key={ex.type ? `${ex.type}-${i}` : i}>
                {ex.type && <strong>{ex.type}: </strong>}
                {ex.description}
              </li>
            ))}
          </ul>
        )}
      {block.items && Array.isArray(block.items) && (
        <ul className="ml-4 pl-4 mt-2">
          {block.items.map((item: any, idx: number) =>
            renderBlock(item, key ? `${key}-item-${idx}` : `item-${idx}`)
          )}
        </ul>
      )}
      {block.moreInfo && <p className="mt-2">{block.moreInfo}</p>}
    </li>
  );
}

type CategoryItemProps = {
  cat: Category;
  index: number;
};

const CategoryItem: React.FC<CategoryItemProps> = React.memo(
  function CategoryItem({ cat, index }) {
    const [mounted, setMounted] = React.useState(false);
    const [_isPending, startTransition] = React.useTransition();

    const renderedDescription = React.useMemo(() => {
      if (!mounted) return null;
      return renderBlock(cat.description, `cat-desc-${index}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted, cat.description]);

    return (
      <AccordionItem key={cat.title || index} value={`item-${index}`}>
        <AccordionTrigger
          className="text-[20px] leading-[24px] font-400 md:text-[24px] md:leading-[32px]"
          onClick={() => {
            if (!mounted) {
              startTransition(() => setMounted(true));
            }
          }}
        >
          {cat.title}
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-[16px] leading-[24px] pt-[8px] font-400 mb-[16px]">
            {renderedDescription}
          </p>

          {cat.examples &&
            Array.isArray(cat.examples) &&
            cat.examples.length > 0 && (
              <ul className="list-disc pl-5 space-y-6">
                {cat.examples.map((ex: any, i: number) => (
                  <li
                    className="text-[16px] leading-[24px] font-400"
                    key={ex.type ? `${ex.type}-${i}` : i}
                  >
                    <strong>{ex.type}:</strong> {ex.description}
                  </li>
                ))}
              </ul>
            )}

          {cat.moreInfo && (
            <p className="mt-6 text-[16px] leading-[24px] font-400">
              {cat.moreInfo}
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    );
  },
  (prev, next) => {
    return (
      prev.cat.title === next.cat.title &&
      prev.cat.description === next.cat.description &&
      prev.cat.examples === next.cat.examples &&
      prev.cat.moreInfo === next.cat.moreInfo
    );
  }
);

const Cookies: React.FC = () => {
  const t = useTranslations('cookies');
  const categories = t.raw('categories') as Category[];
  const [accordionOpen, setAccordionOpen] = React.useState(false);

  // Handler for Accordion value change
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
