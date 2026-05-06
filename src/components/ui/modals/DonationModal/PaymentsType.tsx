'use client';

import { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { DonationFormValues } from '@/types/donationType';
import { Button } from '@/components/ui/Button';

const presetAmounts = [25, 50, 75, 100, 125, 150, 175] as const;

export const PaymentsType = (): JSX.Element => {
  const t = useTranslations('card');
  const [paymentType, setPaymentType] = useState<'once' | 'monthly'>('once');
  const [isOther, setIsOther] = useState(false);
  const { watch, setValue, resetField } = useFormContext<DonationFormValues>();

  const selectedAmount = watch('amount');

  return (
    <div className="mb-12 space-y-4">
      <h3 className="text-base ">{t('title')}</h3>

      <div className="flex flex-wrap gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setPaymentType('once')}
          className={cn(
            'h-12 rounded-[6px] border border-[#2C8C8C] text-md transition-colors',
            paymentType === 'once'
              ? 'bg-[#2C8C8C] text-white'
              : 'bg-transparent '
          )}
        >
          Give once
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setPaymentType('monthly')}
          className={cn(
            'h-12 rounded-[6px] border border-[#2C8C8C] text-md transition-colors',
            paymentType === 'monthly'
              ? 'bg-[#2C8C8C] text-white'
              : 'bg-transparent '
          )}
        >
          Give monthly
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 sm:grid-cols-5">
        {presetAmounts.map((amount) => (
          <Button
            key={amount}
            type="button"
            variant="secondary"
            onClick={() => {
              setIsOther(false);
              setValue('amount', amount, { shouldValidate: true });
            }}
            className={cn(
              'h-12 rounded-[6px] border border-[#2C8C8C] text-md  transition-colors',
              selectedAmount === amount
                ? 'bg-[#2C8C8C] text-white'
                : 'bg-transparent '
            )}
          >
            ${amount}
          </Button>
        ))}

        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setIsOther(true);
            resetField('amount');
          }}
          className={cn(
            'h-12 rounded-[6px] border border-[#2C8C8C] text-md transition-colors col-span-2 sm:col-span-1',
            isOther ? 'bg-[#2C8C8C] text-white' : 'bg-transparent '
          )}
        >
          $ Other
        </Button>
      </div>
    </div>
  );
};
