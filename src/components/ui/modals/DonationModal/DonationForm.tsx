'use client';

import {
  useStripe,
  useElements,
  // CardExpiryElement,
  // CardCvcElement,
} from '@stripe/react-stripe-js';
import { Controller, useForm } from 'react-hook-form';
// import { useTranslations } from 'next-intl';
import {
  // CardInputWrapper,
  CurrencySelect,
  // DonationCardNumber,
  Input,
  PaymentCardList,
} from '@/components';
import { useState, JSX, useEffect } from 'react';
import { CardData, CardFormProps } from '@/types';
import { createCardPaymentMethod } from '@/services/createPaymentMethod';
import { useCardInputs } from '@/hooks/useCardInputs';

const currencies = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

type FormData = {
  currency: string;
  amount: number;
};

export const DonationForm = ({
  onSuccess,
  initialValues = {},
  setIsSubmitting,
}: CardFormProps): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  // const t = useTranslations('card');
  const { inputData } = useCardInputs();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CardData>({
    defaultValues: initialValues,
  });

  const [_cardError, setCardError] = useState<string | null>(null);
  // const [focusedElement, setFocusedElement] = useState<string | null>(null);

  // Якщо initialValues зміняться динамічно (не обов’язково)
  useEffect(() => {
    if (initialValues) {
      setValue('fullName', initialValues.fullName || '');
      setValue('city', initialValues.city || '');
      setValue('country', initialValues.country || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control } = useForm<FormData>({
    defaultValues: {
      currency: 'USD',
    },
  });

  const onSubmit = async (data: CardData): Promise<void> => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setCardError(null);

    try {
      if (!stripe || !elements) throw new Error('Stripe not loaded');

      const method = await createCardPaymentMethod({
        stripe,
        elements,
        billingDetails: {
          name: data.fullName,
          address: {
            city: data.city,
            country: data.country,
          },
        },
      });

      if (!method?.card) throw new Error('Card creation failed');

      const card: CardData = {
        paymentMethodId: method.id,
        brand: method.card.brand ?? '',
        last4: method.card.last4 ?? '',
        exp_month: method.card.exp_month ?? 0,
        exp_year: method.card.exp_year ?? 0,
        fullName: data.fullName,
        city: data.city,
        country: data.country,
      };

      onSuccess(card);
    } catch (err: any) {
      setCardError(err.message ?? 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:max-w-[500px] mx-auto"
      autoComplete="off"
    >
      {inputData.map(({ name, placeholder, validation }) => (
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

      <div className="flex gap-2">
        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <CurrencySelect
              {...field}
              options={currencies}
              placeholder="Виберіть валюту"
              onValueChange={field.onChange}
            />
          )}
        />
        <Input
          name="amount"
          placeholder="10000"
          className="h-12 w-[118px] bg-[#ffffff] rounded-sm relative flex items-center p-3 focus-within:ring-1 focus-within:ring-[#00c1ac]"
        />
      </div>
      <div>
        <PaymentCardList />
      </div>
    </form>
  );
};
