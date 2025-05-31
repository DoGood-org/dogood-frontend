'use client';
import { IPropsFilterPanel } from '@/types/mapType';
import React, { FC } from 'react';

export const FilterPannel: FC<IPropsFilterPanel> = ({
  selectedCategories,
  selectedDistances,
  selectedCategoryButtons,
  selectedDistanceButtons,
}) => {
  return (
    <div className="">
      {/* Div with selected category buttons - only show if there are selected categories */}
      {selectedCategories.length > 0 && (
        <div className="absolute z-[500] top-[5px] left-[508px] flex gap-[30px] w-[500px]">
          {selectedCategoryButtons}
        </div>
      )}
      {/* Div with selected distance buttons - only show if there are selected distances */}
      {selectedDistances.length > 0 && (
        <div className="absolute z-[500] top-[80px] left-[508px] flex gap-[30px] w-[500px]">
          {selectedDistanceButtons}
        </div>
      )}
    </div>
  );
};
