'use client';

import type { JSX } from 'react';
import { StepCard } from './StepCard';
import { BackNextButtons } from './Buttons/BackNextButtons';
import { PictureField } from './PictureField';
import { StepLayoutProps } from '@/types/createTask.type';
import { StepIndicator } from './StepIndicator';
import { useTranslations } from 'next-intl';

export const StepLayout = ({
  children,
  showBack = true,
  className = '',
  title,
}: StepLayoutProps): JSX.Element => {
  const t = useTranslations('tasks.createTask.stepTitles');
  const displayTitle = title || t('addPicture');

  return (
    <div className={`lg:px-20 ${className}`}>
      <StepCard>
        <div className="flex gap-6 flex-col lg:flex-row md:px-[60px] lg:px-0">
          <div className="shrink-0">
            <h3 className="text-base text-foreground max-w-[353px] md:max-w-[432px] lg:max-w-[415px] truncate">
              {displayTitle}
            </h3>
            <PictureField />
          </div>

          <div className="flex w-full">
            <div className="flex-1 flex flex-col">
              <div>{children}</div>

              <div className="flex justify-end">
                <BackNextButtons showBack={showBack} />
              </div>
            </div>
          </div>
        </div>
      </StepCard>
      <div className="mt-6">
        <StepIndicator />
      </div>
    </div>
  );
};
