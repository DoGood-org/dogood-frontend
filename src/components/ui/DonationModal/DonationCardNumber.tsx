'use client';

import { CardNumberElement } from '@stripe/react-stripe-js';
import { JSX, useState } from 'react';
import { donationcardIcons } from './DonationCardIcons';
import { DonationInputWrapper } from '@/components';
import { options } from '@/config/stripeElement';

export const DonationCardNumber = ({
  focusedElement,
  setFocusedElement,
}: {
  focusedElement: string | null;
  setFocusedElement: (el: string | null) => void;
}): JSX.Element => {
  const [cardBrand, setCardBrand] = useState<string>('default');

  const handleCardChange = (event: any): void => {
    if (event.brand) {
      setCardBrand(event.brand);
    }
  };

  const Icon = donationcardIcons[cardBrand] ?? donationcardIcons.default;

  return (
    <DonationInputWrapper
      className={`${focusedElement === 'number' ? 'ring-1 ring-border focus-within:ring-border' : 'ring-transparent'}`}
    >
      <div className="w-full focus-within:border-border">
        <CardNumberElement
          onChange={handleCardChange}
          onFocus={() => setFocusedElement('number')}
          onBlur={() => setFocusedElement(null)}
          options={options}
          className="focus-within:border-border"
        />
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-5 flex items-center justify-center pointer-events-none rounded-sm overflow-hidden">
        <Icon className="size-6 w-7 h-5 " preserveAspectRatio="xMidYMid meet" />
      </div>
    </DonationInputWrapper>
  );
};
