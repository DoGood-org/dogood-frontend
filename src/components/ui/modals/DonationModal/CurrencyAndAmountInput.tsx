'use client';

import React, { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { CurrencySelect } from './CurrencySelect';

interface CurrencyAndAmountProps {
  currencies: { value: string; label: string }[];
  amountName?: string;
  currencyName?: string;
}

export const CurrencyAndAmountInput = ({
  currencies,
  amountName = 'amount',
  currencyName = 'currency',
}: CurrencyAndAmountProps): JSX.Element => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <Input
          id={amountName}
          type="number"
          {...register(amountName, {
            required: 'Enter the donation amount',
            min: { value: 1, message: 'The amount must be no less than 1' },
          })}
          placeholder="10000"
          min={1}
          onKeyDown={(e) => {
            if (e.key === '-' || e.key === 'e' || e.key === 'E')
              e.preventDefault();
          }}
          className="
            h-12 w-[118px] bg-[#ffffff] rounded-sm flex items-center p-3
            border border-[#111113] text-[#010101]
            focus:border-[#00c1ac]
            focus:ring-0 focus:ring-offset-0
            focus-visible:ring-0 focus-visible:ring-offset-0
            focus-within:ring-0
            outline-none
            placeholder-[#010101]
            [appearance:textfield] 
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        <Controller
          name={currencyName}
          control={control}
          render={({ field }) => (
            <CurrencySelect
              {...field}
              options={currencies}
              placeholder="USD"
              onValueChange={field.onChange}
            />
          )}
        />
      </div>

      {errors[amountName] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[amountName]?.message as string}
        </p>
      )}
    </div>
  );
};
