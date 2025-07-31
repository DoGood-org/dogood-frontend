'use client';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useForm, Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';
import { CardNumberInput } from './CardNumberInput';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type FormData = {
  fullName: string;
  city: string;
  country: string;
  card: string;
};

export const CardForm = ({
  onSuccess,
}: {
  onSuccess: () => void;
}): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const t = useTranslations('card');
  const { control, register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = async (data: FormData): Promise<void> => {
    const card = elements?.getElement(CardNumberElement);
    if (!stripe || !card) return;

    const { setupIntent, error } = await stripe.confirmCardSetup(
      '{{CLIENT_SECRET}}',
      {
        payment_method: {
          card,
          billing_details: {
            name: data.fullName,
            address: { city: data.city, country: data.country },
          },
        },
      }
    );
    if (error) {
      alert(error.message);
    } else {
      onSuccess();
      console.log(setupIntent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      autoComplete="off"
    >
      <Input
        {...register('fullName')}
        type="text"
        placeholder={t('fullName')}
        className="placeholder:text-text-gray"
      />
      <Input
        {...register('country')}
        type="text"
        placeholder={t('country')}
        className="placeholder:text-text-gray"
      />
      <Input
        type="text"
        {...register('city')}
        placeholder={t('city')}
        className="placeholder:text-text-gray"
      />

      {/* Stripe Fields */}
      <Controller
        control={control}
        name="card"
        render={() => (
          <>
            <CardNumberInput />
            <CardExpiryElement className="..." />
            <CardCvcElement className="..." />
          </>
        )}
      />
      <Button type="submit" disabled={!stripe} className="btn-primary">
        {t('add')}
      </Button>
    </form>
  );
};

// 'use client';

// import { useForm } from 'react-hook-form';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useTranslations } from 'next-intl';
// import { JSX } from 'react';
// import { CardNumberInput } from './CardNumberInput';

// export const CardForm = ({
//   onSuccess,
// }: {
//   onSuccess: () => void;
// }): JSX.Element => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const t = useTranslations('card');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data: any): Promise<void> => {
//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) return;

//     const { token, error } = await stripe.createToken(cardElement, {
//       name: data.fullName,
//       address_city: data.city,
//       address_country: data.country,
//     });

//     if (error) {
//       console.error(error.message);
//     } else {
//       console.log('Token:', token);
//       onSuccess(); // Закрити модалку
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
//       <h2 className="form__title">{t('title')}</h2>

//       <input
//         {...register('fullName', { required: true })}
//         placeholder={t('fullName')}
//         className="form__input"
//       />
//       <input
//         {...register('country', { required: true })}
//         placeholder={t('country')}
//         className="form__input"
//       />
//       <input
//         {...register('city', { required: true })}
//         placeholder={t('city')}
//         className="form__input"
//       />

//       <div className="form__stripe">
//         <CardNumberInput />
//         {/* <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: '16px',
//                 color: 'var(--text)',
//                 '::placeholder': {
//                   color: 'var(--placeholder)',
//                 },
//               },
//               invalid: {
//                 color: 'var(--danger)',
//               },
//             },
//           }}
//         /> */}
//       </div>

//       <button type="submit" className="form__button">
//         {t('add')}
//       </button>
//     </form>
//   );
// };
