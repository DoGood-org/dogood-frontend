'use client';

import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { CurrencyAndAmountInput } from '@/components/ui/modals/DonationModal/CurrencyAndAmountInput';
import { PaymentCardList } from '@/components/ui/modals/DonationModal/PaymentCardList';

export const PayoutMethods = (): JSX.Element => {
  const t = useTranslations('card');
  const tPayout = useTranslations('tasks.createTask.payout');

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
        <h2 className="text-text-base mb-2">{tPayout('donationTitle')}</h2>
        <p className="text-[12px] leading-[16px] tracking-[0%] mb-2">
          {tPayout('donationDescription')}
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
          <h2 className="text-text-base mb-2">{tPayout('financialTitle')}</h2>
          <p className="text-[12px] leading-[16px] tracking-[0%] mb-2">
            {tPayout('financialDescription')}
          </p>
        </div>
      </div>
      <PaymentCardList scrollable={false} />
    </div>
  );
};
