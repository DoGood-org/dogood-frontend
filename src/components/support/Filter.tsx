'use client';
import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { IFilterProps } from '@/types/support';
import { Label } from '../ui/Label';
import { ArrowRight } from '../icons';

export const Filter = ({
  handleFilterChange,
  t,
}: IFilterProps): React.JSX.Element => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    handleFilterChange(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex w-full justify-end mb-10 md:mb-12 lg:mb-20">
      <Label
        htmlFor="search"
        className="w-full md:w-[314px] flex flex-col items-start gap-2 text-base"
      >
        {t('filterLabel')}
        <form onSubmit={handleSubmit} className="relative w-full md:w-[314px]">
          <Input
            id="search"
            type="text"
            placeholder={t('filterPlaceholder')}
            value={inputValue}
            onChange={handleInputChange}
            className="w-full text-foreground p-3 h-12 bg-card border-none rounded-sm placeholder:text-foreground/50"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer">
            <ArrowRight className="h-5 w-5 hover:scale-x-125 transition-all duration-30" />
          </button>
        </form>
      </Label>
    </div>
  );
};
