import { Close } from '@/components/icons';
import React, { FC } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { IPropsFilters } from '@/typings/mapTypes';

export const Filters: FC<IPropsFilters> = ({ setIsSettingOpen }) => {
  return (
    <div className="absolute top-[50px] left-0 w-[478px] h-[619px] bg-white -z-10 px-[35px] py-10">
      <div className="flex justify-between align-text-bottom mb-[25px]">
        <h3 className="text-xl font-semibold">Filters</h3>
        <Close
          className="w-[22px] h-[21px]"
          onClick={() => {
            setIsSettingOpen(false);
          }}
        />
      </div>
      <h4 className="text-lg font-semibold mb-[13px]">Category</h4>
      <CategoryFilter />
    </div>
  );
};
