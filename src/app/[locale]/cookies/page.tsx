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

const Cookies: React.FC = () => {
  const t = useTranslations('cookies');

  const categories = t.raw('categories') as Category[];
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

          <Accordion type="single" collapsible>
            {categories.map((cat, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-[20px] leading-[24px] font-400 md:text-[24px] md:leading-[32px]">
                  {cat.title}
                </AccordionTrigger>
                <AccordionContent>
                  {/* Universal recursive block renderer */}
                  {((): React.ReactNode => {
                    function renderBlock(
                      block: any,
                      key?: React.Key
                    ): React.ReactNode {
                      if (typeof block === 'string') {
                        return (
                          <p
                            key={key}
                            className="mb-2 whitespace-pre-line break-words"
                          >
                            {block}
                          </p>
                        );
                      }
                      if (Array.isArray(block)) {
                        return (
                          <div key={key} className="mb-2 space-y-2">
                            {block.map((item, idx) => renderBlock(item, idx))}
                          </div>
                        );
                      }
                      // Object case
                      return (
                        <div key={key} className="mb-2">
                          {block.title && (
                            <h4 className="text-xl font-semibold mt-4 mb-2">
                              {block.title}
                            </h4>
                          )}
                          {block.heading && (
                            <h5 className="text-lg font-semibold mt-3 mb-2">
                              {block.heading}
                            </h5>
                          )}
                          {block.paragraph && (
                            <p className="mb-2 whitespace-pre-line break-words">
                              {block.paragraph}
                            </p>
                          )}
                          {block.type && <strong>{block.type}</strong>}
                          {block.content && <span> {block.content}</span>}
                          {block.content2 && (
                            <p className="mb-2 whitespace-pre-line break-words">
                              {block.content2}
                            </p>
                          )}
                          {block.content3 && (
                            <p className="mb-2 whitespace-pre-line break-words">
                              {block.content3}
                            </p>
                          )}
                          {block.content4 && (
                            <p className="mb-2 whitespace-pre-line break-words">
                              {block.content4}
                            </p>
                          )}
                          {block.description &&
                            typeof block.description === 'string' && (
                              <p className="mb-2 whitespace-pre-line break-words">
                                {block.description}
                              </p>
                            )}
                          {block.description &&
                            Array.isArray(block.description) && (
                              <div className="mb-2 space-y-2">
                                {block.description.map(
                                  (desc: any, idx: number) =>
                                    renderBlock(desc, idx)
                                )}
                              </div>
                            )}
                          {block.examples &&
                            Array.isArray(block.examples) &&
                            block.examples.length > 0 && (
                              <ul className="pl-5 space-y-1">
                                {block.examples.map((ex: any, i: number) => (
                                  <li key={i}>
                                    {ex.type && <strong>{ex.type}: </strong>}
                                    {ex.description}
                                  </li>
                                ))}
                              </ul>
                            )}
                          {block.items && Array.isArray(block.items) && (
                            <div className="ml-4 border-l pl-4 mt-2">
                              {block.items.map((item: any, idx: number) =>
                                renderBlock(item, idx)
                              )}
                            </div>
                          )}
                          {block.moreInfo && (
                            <p className="mt-2 italic">{block.moreInfo}</p>
                          )}
                        </div>
                      );
                    }
                    // Рендеримо description, а також якщо description масив — всі вкладені блоки
                    return renderBlock(cat.description);
                  })()}

                  {cat.examples &&
                    Array.isArray(cat.examples) &&
                    cat.examples.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1">
                        {cat.examples.map((ex: any, i: number) => (
                          <li key={i}>
                            <strong>{ex.type}:</strong> {ex.description}
                          </li>
                        ))}
                      </ul>
                    )}

                  {cat.moreInfo && (
                    <p className="mt-2 italic">{cat.moreInfo}</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

export default Cookies;
