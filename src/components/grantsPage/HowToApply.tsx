import React from 'react';
import { getApplyingSteps } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Section } from '../ui/Section';

export const HowToApply = (): React.JSX.Element => {
  const t = useTranslations('grantsPage');
  const HOWTOAPPLY_LIST = getApplyingSteps(t);

  return (
    <Section>
      <h2 className="text-h2-m text-center mb-4 md:mb-8 lg:mb-10 lg:text-h2">
        {t('howToApply.title')}
      </h2>
      <ul className="relative flex flex-col space-y-2 space-x-0 md:space-y-0">
        {HOWTOAPPLY_LIST.map((step, index) => {
          const isEven = index % 2 !== 0;

          return (
            <li
              key={index + step.title}
              className={`relative flex w-full ${isEven ? 'justify-end' : 'justify-start'}`}
            >
              <div className=" bg-modal border border-btn-outline-hover dark:border-transparent z-10 p-3 md:py-4.5 md:px-9.5 lg:py-6 lg:px-12 rounded-lg w-42 h-37 md:w-75 md:h-19 lg:w-95 lg:h-24 flex flex-col gap-4 md:flex-row md:gap-1 lg:gap-2 items-center text-center md:justify-start md:text-start">
                <div className="w-12 h-12 md:w-9 md:h-9 lg:w-12 lg:h-12 bg-background rounded-md flex items-center justify-center">
                  {step.icon && <step.icon className="w-12 h-12" />}
                </div>
                <p className="text-sm leading-5 lg:text-base ">{step.title}</p>
              </div>

              {index < HOWTOAPPLY_LIST.length - 1 && (
                <div
                  className={`absolute border-t-2  border-dashed border-btn-outline-hover
                    ${
                      isEven
                        ? 'top-1/2 w-26 h-22 -translate-x-42 md:-translate-x-75 lg:-translate-x-95 md:w-48 lg:w-180 md:h-10 lg:h-12 border-l-2 border-r-0 rounded-tl-3xl'
                        : 'top-1/2 w-26 h-22 translate-x-42 md:translate-x-75 lg:translate-x-95 md:w-48 lg:w-180 md:h-10 lg:h-12 border-r-2 rounded-tr-3xl '
                    }`}
                />
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
};
