'use client';

import { useElements, useStripe } from '@stripe/react-stripe-js';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from '@stripe/stripe-js';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { JSX, useState } from 'react';
import { DonationFormProps, DonationFormValues } from '@/types/donationType';
import { yupResolver } from '@hookform/resolvers/yup';
import { donationSchema } from '@/lib/validation/donationSchema';
import { Button } from '@/components/ui/Button';
import { useDonationSubmit } from '@/hooks/useDonationSubmit';
import { CurrencyAndAmountInput } from './CurrencyAndAmountInput';
import { PaymentCardList } from './PaymentCardList';
import { PaymentsType } from './PaymentsType';
import { DonateTarget } from './DonateTarget';
import { CommunityConsent } from './CommunityConsent';
import { CommunityEngagementBlock } from './CommunityEngagementBlock';
import { DonationPersonalInfoSection } from './DonationPersonalInfoSection';
import {
  DonationCardDetailsSection,
  DonationCardErrors,
  DonationCardField,
} from './DonationCardDetailsSection';

const currencies = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

export const DonationForm = ({
  initialValues = {},
  onSuccess,
  setIsSubmitting,
}: DonationFormProps): JSX.Element => {
  const t = useTranslations('card');
  const stripe = useStripe();
  const elements = useElements();

  const [cardErrors, setCardErrors] = useState<DonationCardErrors>({
    number: null,
    expiry: null,
    cvc: null,
  });
  const [cardCompletion, setCardCompletion] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });
  const [focusedElement, setFocusedElement] =
    useState<DonationCardField | null>(null);

  const methods = useForm<DonationFormValues>({
    resolver: yupResolver(donationSchema) as any,
    defaultValues: {
      firstName: initialValues.firstName || '',
      lastName: initialValues.lastName || '',
      email: initialValues.email || '',
      postCode: initialValues.postCode || '',
      country: initialValues.country || '',
      streetAddress: initialValues.streetAddress || '',
      currency: initialValues.currency || 'USD',
      amount: initialValues.amount || undefined,
      donationType: initialValues.donationType || 'ORGANIZATION',
      selectedPaymentMethodId: initialValues.selectedPaymentMethodId || '',
      emailUpdates: initialValues.emailUpdates ?? false,
      textMessages: initialValues.textMessages ?? false,
      communityEmailUpdates: initialValues.communityEmailUpdates ?? true,
      communityTextMessages: initialValues.communityTextMessages ?? true,
      hideNamePublicly: initialValues.hideNamePublicly ?? true,
    },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const amount = watch('amount');
  const currency = watch('currency');
  const selectedPaymentMethodId = watch('selectedPaymentMethodId');
  const hasSelectedCard = Boolean(selectedPaymentMethodId);

  const handleNumberChange = (
    event: StripeCardNumberElementChangeEvent
  ): void => {
    setCardErrors((prev) => ({
      ...prev,
      number: event.error?.message ?? null,
    }));
    setCardCompletion((prev) => ({ ...prev, number: event.complete }));
  };

  const handleExpiryChange = (
    event: StripeCardExpiryElementChangeEvent
  ): void => {
    setCardErrors((prev) => ({
      ...prev,
      expiry: event.error?.message ?? null,
    }));
    setCardCompletion((prev) => ({ ...prev, expiry: event.complete }));
  };

  const handleCvcChange = (event: StripeCardCvcElementChangeEvent): void => {
    setCardErrors((prev) => ({ ...prev, cvc: event.error?.message ?? null }));
    setCardCompletion((prev) => ({ ...prev, cvc: event.complete }));
  };

  const onSubmit = useDonationSubmit({
    cardCompletion,
    setCardErrors,
    onSuccess,
    setIsSubmitting,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
      >
        <PaymentsType />
        <DonateTarget />

        <DonationPersonalInfoSection />

        <CommunityEngagementBlock />

        <CurrencyAndAmountInput
          currencies={currencies}
          amountName="amount"
          currencyName="currency"
        />

        <PaymentCardList />

        <DonationCardDetailsSection
          disabled={hasSelectedCard}
          cardErrors={cardErrors}
          focusedElement={focusedElement}
          onFocusChange={setFocusedElement}
          onNumberChange={handleNumberChange}
          onExpiryChange={handleExpiryChange}
          onCvcChange={handleCvcChange}
        />
        <CommunityConsent />

        <Button
          type="submit"
          variant="primary"
          className="w-full text-white"
          disabled={isSubmitting || !stripe || (!hasSelectedCard && !elements)}
        >
          {isSubmitting
            ? t('processing')
            : amount
              ? `${t('donate')} ${amount}${currency === 'USD' ? '$' : '€'}`
              : t('donate')}
        </Button>
      </form>
    </FormProvider>
  );
};
