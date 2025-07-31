'use client';

import { JSX, useState } from 'react';
import { CardNumberElement } from '@stripe/react-stripe-js';
// import creditCardType from 'credit-card-type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faCreditCard,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
  faCcDinersClub,
  faCcJcb,
} from '@fortawesome/free-brands-svg-icons';

const brandIconMap: Record<string, any> = {
  visa: faCcVisa,
  mastercard: faCcMastercard,
  'american-express': faCcAmex,
  discover: faCcDiscover,
  'diners-club': faCcDinersClub,
  jcb: faCcJcb,
};

export const CardNumberInput = (): JSX.Element => {
  const [cardBrand, setCardBrand] = useState<string | null>(null);

  const handleCardChange = (event: any): void => {
    if (event.brand) {
      setCardBrand(event.brand);
    }
  };

  const icon = brandIconMap[cardBrand ?? ''] ?? faCcJcb;

  return (
    <div className="relative w-full bg-white">
      <div className="relative flex items-center w-full">
        <CardNumberElement
          onChange={handleCardChange}
          options={{
            showIcon: false,
            style: {
              base: {
                // backgroundColor: 'white',
                fontSize: '16px',
                color: '#111827',
                '::placeholder': {
                  color: '#6B7280',
                },
              },
              invalid: {
                color: '#EF4444',
              },
            },
          }}
          className="w-full p-3 pr-12 rounded-md border border-gray-300 bg-white text-gray-900  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <FontAwesomeIcon
          icon={icon}
          className="absolute right-3 text-gray-400 dark:text-gray-300 text-xl pointer-events-none"
        />
      </div>
    </div>
  );
};
