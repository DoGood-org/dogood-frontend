'use client';
import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { IFilterProps } from '@/types/support';
import { Label } from '../ui/Label';
import { ArrowRight } from '../icons';

export const SearchFilter = ({
  handleFilterChange,
  t,
  isLabelVisible = true,
  className = '',
  labelClassName = '',
}: IFilterProps): React.JSX.Element => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    handleFilterChange(inputValue.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const next = e.target.value;
    setInputValue(next);

    if (next.trim() === '') {
      handleFilterChange('');
    }
  };

  return (
    <div className={`flex w-full ${className}`}>
      <Label
        htmlFor="search"
        className={`w-full md:w-78.5 flex flex-col items-start gap-2 text-base ${labelClassName}`}
      >
        {isLabelVisible && t('filterLabel')}
        <form
          onSubmit={handleSubmit}
          className={`relative w-full ${labelClassName}`}
        >
          <Input
            id="search"
            type="text"
            placeholder={t('filterPlaceholder')}
            value={inputValue}
            onChange={handleInputChange}
            className="
    w-full text-foreground p-3 h-12 bg-card rounded-sm
    placeholder:text-foreground/50
    border border-transparent
    transition-colors duration-300
    hover:border-border
    focus:border-border
    focus:outline-none
    focus-visible:border-border
    focus-visible:outline-none
    focus-visible:ring-0
    focus-visible:ring-offset-0
    focus:ring-0
    focus:ring-offset-0
    shadow-none
  "
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
          >
            <ArrowRight className="h-5 w-5 hover:scale-x-125 transition-all duration-30" />
          </button>
        </form>
      </Label>
    </div>
  );
};
