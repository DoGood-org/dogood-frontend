'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { useCardInputs } from '@/hooks/useCardInputs';
import {
  DonationFormProps,
  DonationFormValues,
  DonationType,
} from '@/types/donationType';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { donationSchema } from '@/lib/validation/donationSchema';
import { createCheckoutSession } from '@/services/donationService';
import { useStripe } from '@stripe/react-stripe-js';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CurrencyAndAmountInput } from './CurrencyAndAmountInput';
import { PaymentCardList } from './PaymentCardList';

const currencies = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

export const DonationForm = ({
  initialValues = {},
}: DonationFormProps): JSX.Element => {
  const t = useTranslations('card');
  const stripe = useStripe();
  useCardInputs();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields, submitCount, isSubmitting },
  } = useForm<DonationFormValues>({
    resolver: yupResolver(donationSchema),
    defaultValues: {
      fullName: initialValues.fullName || '',
      city: initialValues.city || '',
      country: initialValues.country || '',
      currency: initialValues.currency || 'USD',
      amount: initialValues.amount || undefined,
      donationType: initialValues.donationType || 'ORGANIZATION',
    },
  });

  const cardInputs = [
    {
      name: 'fullName',
      placeholder: t('fullName'),
      validation: { required: t('validation.required') },
    },
    {
      name: 'country',
      placeholder: t('country'),
      validation: { required: t('validation.required') },
    },
    {
      name: 'city',
      placeholder: t('city'),
      validation: { required: t('validation.required') },
    },
  ] as const;

  const onSubmit: SubmitHandler<DonationFormValues> = async (data: {
    fullName: string;
    country: string;
    city: string;
    amount: number;
    currency: NonNullable<'USD' | 'EUR' | undefined>;
    donationType: DonationType;
  }): Promise<void> => {
    if (isSubmitting) return;

    try {
      const payload = {
        fullName: data.fullName,
        country: data.country,
        city: data.city,
        amount: data.amount,
        currency: data.currency,
        donationType: data.donationType,
      };

      const response = await createCheckoutSession(payload);
      if (!response.ok) {
        throw new Error(
          response.errorMessage || 'Failed to create checkout session'
        );
      }

      if (!stripe) throw new Error('Stripe not loaded');

      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (err: any) {
      toast.error(err.message || 'Unknown error');
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:max-w-[500px] mx-auto"
      autoComplete="off"
    >
      {cardInputs.map(({ name, placeholder, validation }) => (
        <div key={name}>
          <Input
            {...register(name, validation)}
            placeholder={placeholder}
            className="placeholder:text-[#0D0D0D99] text-base text-[#0D0D0D] h-12 bg-[#ffffff] rounded-[4px] relative flex items-center p-3 border border-[#111113] focus-within:ring-1 focus-visible:ring-1 focus-within:ring-[#00c1ac] focus-within:border-transparent focus-visible:border-transparent"
          />
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
          )}
        </div>
      ))}

      <CurrencyAndAmountInput
        control={control}
        register={register}
        errors={errors}
        touchedFields={touchedFields}
        submitCount={submitCount}
        currencies={currencies}
      />
      <div>
        <PaymentCardList />
      </div>
      <Button
        type="submit"
        variant="primary"
        className="w-full
        text-[#ffffff]"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('processing') : t('donate')}
      </Button>
    </form>
  );
};
