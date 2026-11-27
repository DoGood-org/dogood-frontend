'use client';

import React, { JSX, useState } from 'react';
import { FilterSelect } from './FilterSelect';
import { DatePicker } from './DatePicker';
import { DateRange } from 'react-day-picker';
import { DateFilterConfig, FilterConfig, FilterValues } from '@/types/admin';

export const FilterPanel = ({
  config,
  onFilterChange,
  className,
}: {
  config: FilterConfig[];
  onFilterChange?: (filters: FilterValues) => void;
  className?: string;
}): JSX.Element => {
  const [values, setValues] = useState<FilterValues>({});

  const updateValue = (key: string, value: FilterValues[string]): void => {
    const next = { ...values, [key]: value };
    setValues(next);
    onFilterChange?.(next);
  };

  return (
    <ul className={`flex rounded-md w-full justify-between ${className || ''}`}>
      {config.map((filter) => (
        <li key={filter.key}>
          {filter.type === 'select' ? (
            <FilterSelect
              value={(values[filter.key] as string) || ''}
              onValueChange={(v) => updateValue(filter.key, v)}
              options={filter.options}
              placeholderKey={filter.placeholder}
              placeholder={filter.placeholder}
              triggerClassName={filter.triggerClassName}
            />
          ) : (
            <DateFilterNode
              filter={filter}
              value={values[filter.key]}
              onChange={(v) => updateValue(filter.key, v)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

const DateFilterNode = ({
  filter,
  value,
  onChange,
}: {
  filter: DateFilterConfig;
  value: FilterValues[string];
  onChange: (v: Date | DateRange | undefined) => void;
}): JSX.Element => {
  const { key: _key, type: _type, ...rest } = filter;

  if (filter.mode === 'single') {
    return (
      <DatePicker
        {...rest}
        mode="single"
        value={value as Date | undefined}
        onChange={onChange as (v: Date | undefined) => void}
      />
    );
  }

  return (
    <DatePicker
      {...rest}
      mode="range"
      value={value as DateRange | undefined}
      onChange={onChange as (v: DateRange | undefined) => void}
    />
  );
};
