'use client';

import type { JSX, ReactNode } from 'react';
import { StepCard } from './StepCard';
import { BackNextButtons } from './Buttons/BackNextButtons';
import { PictureField } from './PictureField';

type StepLayoutProps = {
  children: ReactNode;
  showBack?: boolean;
  className?: string;
};

export const StepLayout = ({
  children,
  showBack = true,
  className = '',
}: StepLayoutProps): JSX.Element => {
  return (
    <div className={`lg:px-40 ${className}`}>
      <StepCard>
        <div className="flex gap-6 flex-col lg:flex-row items-center lg:items-baseline lg:px-0">
          <div className="shrink-0">
            <h3 className="text-base mb-1">Add picture</h3>
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
    </div>
  );
};
