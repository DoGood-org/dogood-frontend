'use client';

// import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
// import { useTranslations } from 'next-intl';
import {
  Button,
  CurrencyAndAmountInput,
  Input,
  PaymentCardList,
} from '@/components';
import { JSX } from 'react';
// import { createCardPaymentMethod } from '@/services/createPaymentMethod';
import { useCardInputs } from '@/hooks/useCardInputs';
import { DonationFormProps } from '@/types/donationType';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import {
  DonationFormValues,
  donationSchema,
} from '@/lib/validation/donationSchema';
import { createCheckoutSession } from '@/services/donationService';
import { useStripe } from '@stripe/react-stripe-js';

const currencies = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

export const DonationForm = ({
  initialValues = {},
}: DonationFormProps): JSX.Element => {
  // const t = useTranslations('card');
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
      amount: initialValues.amount || 0,
    },
  });

  const cardInputs = [
    {
      name: 'fullName',
      placeholder: 'Full Name',
      validation: { required: 'Required' },
    },
    {
      name: 'country',
      placeholder: 'Country',
      validation: { required: 'Required' },
    },
    { name: 'city', placeholder: 'City', validation: { required: 'Required' } },
  ] as const;

  const onSubmit = async (data: {
    fullName: string;
    country: string;
    city: string;
    amount: number;
    currency: NonNullable<'USD' | 'EUR' | undefined>;
  }): Promise<void> => {
    if (isSubmitting) return;

    try {
      const payload = {
        fullName: data.fullName,
        country: data.country,
        city: data.city,
        amount: data.amount,
        currency: data.currency,
      };

      const response = await createCheckoutSession(payload);
      if (!response.sessionId)
        throw new Error('Failed to create checkout session');

      if (!stripe) throw new Error('Stripe not loaded');

      await stripe.redirectToCheckout({ sessionId: response.sessionId });
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
        {isSubmitting ? 'Processing...' : 'Donate'}
      </Button>
    </form>
  );
};
