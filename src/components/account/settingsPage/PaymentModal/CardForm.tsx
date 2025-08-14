'use client';

import {
  useStripe,
  useElements,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button, CardInputWrapper, CardNumberInput, Input } from '@/components';
import { useState, JSX, useEffect } from 'react';
import { CardData, CardFormProps } from '@/types';
import { createCardPaymentMethod } from '@/services/createPaymentMethod';
import { useCardInputs } from '@/hooks/useCardInputs';
import { options } from '@/config/stripeElement';

export const CardForm = ({
  onSuccess,
  initialValues = {}, // Дефолтне значення
  setIsSubmitting,
}: CardFormProps): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const t = useTranslations('card');
  const { inputData } = useCardInputs();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CardData>({
    defaultValues: initialValues,
  });

  const [cardError, setCardError] = useState<string | null>(null);
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  // Якщо initialValues зміняться динамічно (не обов’язково)
  useEffect(() => {
    if (initialValues) {
      setValue('fullName', initialValues.fullName || '');
      setValue('city', initialValues.city || '');
      setValue('country', initialValues.country || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: CardData): Promise<void> => {
    if (isSubmitting) return; // Захист від дублювання

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
            className="placeholder:text-[#0D0D0D99] text-base text-[#0D0D0D] h-12 bg-[#ffffff] rounded-[4px] relative flex items-center p-3 border border-transparent focus-within:ring-1 focus-visible:ring-1 focus-within:ring-border"
          />
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
          )}
        </div>
      ))}

      <div>
        <CardNumberInput
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
        />
        <div className="flex gap-4 mt-4">
          <CardInputWrapper
            className={`w-[175px] ${focusedElement === 'expiry' ? 'ring-1 ring-border focus-within:ring-border' : 'ring-transparent'}`}
          >
            <CardExpiryElement
              className="w-full block focus-within:border-border"
              options={options}
              onFocus={() => setFocusedElement('expiry')}
              onBlur={() => setFocusedElement(null)}
            />
          </CardInputWrapper>
          <CardInputWrapper
            className={`w-[133px] ${focusedElement === 'cvc' ? 'ring-1 ring-border focus-within:ring-border' : 'ring-transparent'}`}
          >
            <CardCvcElement
              className="w-full block focus-within:border-border"
              options={options}
              onFocus={() => setFocusedElement('cvc')}
              onBlur={() => setFocusedElement(null)}
            />
          </CardInputWrapper>
        </div>
        {cardError && <p className="text-error text-sm mt-1">{cardError}</p>}
      </div>

      <Button
        variant="primary"
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="w-full rounded-[4px] text-white relative"
      >
        {isSubmitting && <span className="loading-button"></span>}
        <span className="relative z-1">
          {!Object.keys(initialValues).length ? (
            <>{t('add')}</>
          ) : (
            <>{t('edit')}</>
          )}
        </span>
      </Button>
    </form>
  );
};
