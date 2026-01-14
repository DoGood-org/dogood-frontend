'use client';

import type { JSX, ReactNode } from 'react';
import { CreateSection } from './CreateSection';
import { BackNextButtons } from './Buttons/BackNextButtons';
import { ImagePlaceholder } from './ImagePlaceholder';

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
    <div className={`lg:px-20 ${className}`}>
      <CreateSection>
        <div className="flex gap-6 flex-col lg:flex-row items-center lg:items-baseline md:px-14 lg:px-0">
          <div className="shrink-0">
            <h3 className="text-base mb-1">Add picture</h3>
            <ImagePlaceholder className="md:w-[432px] md:h-[238px] lg:w-[415px] lg:h-[336px]" />
          </div>

          <div className="flex">
            <div className="flex-1 flex flex-col justify-between">
              <div>{children}</div>

              <div className="flex justify-end">
                <BackNextButtons showBack={showBack} />
              </div>
            </div>
          </div>
        </div>
      </CreateSection>
    </div>
  );
};
