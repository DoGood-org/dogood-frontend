'use client';

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from '@stripe/stripe-js';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export type DonationCardField = 'number' | 'expiry' | 'cvc';

export type DonationCardErrors = {
  number: string | null;
  expiry: string | null;
  cvc: string | null;
};

type DonationCardDetailsSectionProps = {
  disabled?: boolean;
  cardErrors: DonationCardErrors;
  focusedElement: DonationCardField | null;
  onFocusChange: (field: DonationCardField | null) => void;
  onNumberChange: (event: StripeCardNumberElementChangeEvent) => void;
  onExpiryChange: (event: StripeCardExpiryElementChangeEvent) => void;
  onCvcChange: (event: StripeCardCvcElementChangeEvent) => void;
};

const stripeInputOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#0D0D0D',
      fontFamily: 'inherit',
      lineHeight: '24px',
      '::placeholder': {
        color: '#11111399',
      },
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

export const DonationCardDetailsSection = ({
  disabled = false,
  cardErrors,
  focusedElement,
  onFocusChange,
  onNumberChange,
  onExpiryChange,
  onCvcChange,
}: DonationCardDetailsSectionProps): JSX.Element => {
  const t = useTranslations('card');

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm">
          {t('cardDetails.number')}
          <span className="text-red-500">*</span>
        </label>
        <div
          className={cn(
            'h-12 rounded-lg bg-white text-[#0D0D0D] border p-3 flex items-center',
            disabled
              ? 'opacity-60 pointer-events-none border-[#11111366]'
              : focusedElement === 'number'
                ? 'border-transparent ring-1 ring-[#00c1ac]'
                : 'border-[#111113]'
          )}
        >
          <CardNumberElement
            options={{ ...stripeInputOptions, disabled }}
            onChange={onNumberChange}
            onFocus={() => !disabled && onFocusChange('number')}
            onBlur={() => !disabled && onFocusChange(null)}
            className="w-full"
          />
        </div>
        {cardErrors.number && (
          <p className="text-sm text-red-500">{cardErrors.number}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm">
            {t('cardDetails.expiry')}
            <span className="text-red-500">*</span>
          </label>
          <div
            className={cn(
              'h-12 rounded-lg bg-white text-[#0D0D0D] border p-3 flex items-center',
              disabled
                ? 'opacity-60 pointer-events-none border-[#11111366]'
                : focusedElement === 'expiry'
                  ? 'border-transparent ring-1 ring-[#00c1ac]'
                  : 'border-[#111113]'
            )}
          >
            <CardExpiryElement
              options={{ ...stripeInputOptions, disabled }}
              onChange={onExpiryChange}
              onFocus={() => !disabled && onFocusChange('expiry')}
              onBlur={() => !disabled && onFocusChange(null)}
              className="w-full"
            />
          </div>
          {cardErrors.expiry && (
            <p className="text-sm text-red-500">{cardErrors.expiry}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">
            {t('cardDetails.cvc')}
            <span className="text-red-500">*</span>
          </label>
          <div
            className={cn(
              'h-12 rounded-lg bg-white text-[#0D0D0D] border p-3 flex items-center',
              disabled
                ? 'opacity-60 pointer-events-none border-[#11111366]'
                : focusedElement === 'cvc'
                  ? 'border-transparent ring-1 ring-[#00c1ac]'
                  : 'border-[#111113]'
            )}
          >
            <CardCvcElement
              options={{ ...stripeInputOptions, disabled }}
              onChange={onCvcChange}
              onFocus={() => !disabled && onFocusChange('cvc')}
              onBlur={() => !disabled && onFocusChange(null)}
              className="w-full"
            />
          </div>
          {cardErrors.cvc && (
            <p className="text-sm text-red-500">{cardErrors.cvc}</p>
          )}
        </div>
      </div>
    </div>
  );
};
