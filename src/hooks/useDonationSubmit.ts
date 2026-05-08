'use client';

import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useTranslations } from 'next-intl';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createCheckoutSession } from '@/services/donationService';
import { DonationFormValues } from '@/types/donationType';
import { CardData } from '@/types';
import { DonationCardErrors } from '@/components/ui/modals/DonationModal/DonationCardDetailsSection';

type UseDonationSubmitParams = {
  cardCompletion: { number: boolean; expiry: boolean; cvc: boolean };
  setCardErrors: React.Dispatch<React.SetStateAction<DonationCardErrors>>;
  onSuccess: (card: CardData) => void;
  setIsSubmitting: (value: boolean) => void;
};

export const useDonationSubmit = ({
  cardCompletion,
  setCardErrors,
  onSuccess,
  setIsSubmitting,
}: UseDonationSubmitParams): SubmitHandler<DonationFormValues> => {
  const t = useTranslations('card');
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit: SubmitHandler<DonationFormValues> = async (data) => {
    if (!stripe || !elements) {
      toast.error(t('checkout.paymentUnavailable'));
      return;
    }

    if (
      !cardCompletion.number ||
      !cardCompletion.expiry ||
      !cardCompletion.cvc
    ) {
      setCardErrors((prev) => ({
        number: cardCompletion.number
          ? prev.number
          : t('validation.cardNumberIncomplete'),
        expiry: cardCompletion.expiry
          ? prev.expiry
          : t('validation.cardExpiryIncomplete'),
        cvc: cardCompletion.cvc ? prev.cvc : t('validation.cardCvcIncomplete'),
      }));
      return;
    }

    try {
      setIsSubmitting(true);
      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        toast.error(t('checkout.unexpectedError'));
        return;
      }

      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: `${data.firstName} ${data.lastName}`.trim(),
            email: data.email,
            address: {
              line1: data.streetAddress || undefined,
              postal_code: data.postCode || undefined,
              country: data.country || undefined,
            },
          },
        });

      if (stripeError) {
        setCardErrors((prev) => ({
          ...prev,
          number: stripeError.message ?? t('checkout.unexpectedError'),
        }));
        return;
      }

      if (!paymentMethod?.card) {
        toast.error(t('checkout.unexpectedError'));
        return;
      }

      const response = await createCheckoutSession(data);

      if (!response.ok) {
        toast.error(t('checkout.errorCreateSession'));
        return;
      }

      if (!response.data?.sessionId) {
        toast.error(t('checkout.unexpectedError'));
        return;
      }

      onSuccess({
        paymentMethodId: paymentMethod.id,
        brand: paymentMethod.card.brand ?? '',
        last4: paymentMethod.card.last4 ?? '',
        exp_month: paymentMethod.card.exp_month ?? 0,
        exp_year: paymentMethod.card.exp_year ?? 0,
        fullName: `${data.firstName} ${data.lastName}`.trim(),
        city: '',
        country: data.country || '',
      });

      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (err) {
      console.error('Unexpected error in checkout handler:', err);
      toast.error(t('checkout.unexpectedError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return onSubmit;
};
