'use client';
import { IPropsFilterPanel } from '@/types/mapType';
import React, { FC, ReactNode } from 'react';

export const FilterPannel: FC<IPropsFilterPanel> = ({
  selectedCategories,
  selectedDistances,
  selectedCategoryButtons,
  selectedDistanceButtons,
}) => {
  // Convert single ReactNode to array if needed
  const normalizeButtons = (buttons: ReactNode | ReactNode[]): ReactNode[] => {
    return Array.isArray(buttons) ? buttons : [buttons];
  };

  const categoryButtons = normalizeButtons(selectedCategoryButtons);
  const distanceButtons = normalizeButtons(selectedDistanceButtons);

  return (
    <div className="hidden lg:block">
      {(selectedCategories.length > 0 || selectedDistances.length > 0) && (
        <div className="absolute z-[500] top-0 left-[508px] flex flex-wrap gap-[10px] min-w-[700px] max-w-[500px]">
          {categoryButtons}
          {distanceButtons}
        </div>
      )}
    </div>
  );
};
