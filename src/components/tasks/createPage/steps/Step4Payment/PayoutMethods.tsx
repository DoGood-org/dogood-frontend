'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { CurrencyAndAmountInput } from '@/components/ui/modals/DonationModal/CurrencyAndAmountInput';

export const PayoutMethods = (): JSX.Element => {
  const t = useTranslations('card');
  const {
    formState: { errors },
  } = useFormContext();

  const currencies = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
  ];

  const hasError = !!(errors.amount || errors.currency);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold">Donation needs</h2>
        <p>Fill gaps about your donation needs and financial information</p>
      </div>

      <div>
        <h2 className="text-xl font-bold">Financial information</h2>
        <p>Select the account to receive funds...</p>
      </div>

      <div className="mt-4">
        <h3
          className={`text-base font-medium mb-2 ${
            hasError ? 'text-red-500' : 'text-gray-900'
          }`}
        >
          {t('amountQuestion')}*
        </h3>

        <CurrencyAndAmountInput
          currencies={currencies}
          amountName="amount"
          currencyName="currency"
        />
      </div>
    </div>
  );
};
