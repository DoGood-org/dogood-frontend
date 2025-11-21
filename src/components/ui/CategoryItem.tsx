import React from 'react';
import { renderBlock } from '@/utils/renderBlock';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';

export type Example = {
  type: string;
  description: string;
};

export type Category = {
  title: string;
  description: string | Example[];
  examples?: Example[];
  moreInfo?: string;
};

export type CategoryItemProps = {
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
          className="text-[20px] leading-[24px] font-400 md:text-[24px] md:leading-[32px] text-left w-full flex justify-between items-center pb-4"
          onClick={() => {
            if (!mounted) {
              startTransition(() => setMounted(true));
            }
          }}
        >
          <span className="pb-2 border-b-2 border-primary-200 border-foreground inline-block flex-1">
            {cat.title}
          </span>
          <svg
            className="w-4 h-4 md:w-8 md:h-8 text-primary-400 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:transform group-data-[state=open]:transition-transform ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-state-open="rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
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

export default CategoryItem;
