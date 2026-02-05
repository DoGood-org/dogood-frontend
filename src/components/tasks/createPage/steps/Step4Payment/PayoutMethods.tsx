'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { CurrencyAndAmountInput } from '@/components/ui/modals/DonationModal/CurrencyAndAmountInput';
import { PaymentCardList } from '@/components/ui/modals/DonationModal/PaymentCardList';

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
    <div className="flex flex-col mb-6">
      <div>
        <h2 className="text-text-base mb-2">Donation needs</h2>
        <p className="text-[12px] leading-[16px] tracking-[0%] mb-2">
          Fill gaps about your donation needs and financial information
        </p>
      </div>

      <div className="">
        <h3
          className={`text-base font-medium mb-2 ${
            hasError ? 'text-error' : 'text-gray'
          }`}
        >
          {t('amountQuestion')}*
        </h3>

        <CurrencyAndAmountInput
          currencies={currencies}
          amountName="amount"
          currencyName="currency"
        />
        <div className="mt-2">
          <h2 className="text-text-base mb-2">Financial information</h2>
          <p className="text-[12px] leading-[16px] tracking-[0%] mb-2">
            Select the account to receive funds...
          </p>
        </div>
      </div>
      <PaymentCardList scrollable={false} />
    </div>
  );
};
