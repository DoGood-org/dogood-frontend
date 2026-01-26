import * as yup from 'yup';

const MAX_AMOUNT = 10_000;

export const donationSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required('Full name is required')
    .min(2, 'Full name is too short')
    .max(100, 'Full name must be at most 100 characters'),

  country: yup
    .string()
    .trim()
    .required('Country is required')
    .max(56, 'Country name is too long'),

  city: yup
    .string()
    .trim()
    .required('City is required')
    .max(100, 'City name must be at most 100 characters'),

  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Amount must be greater than 0')
    .max(MAX_AMOUNT, `Amount must be less than ${MAX_AMOUNT}`),

  currency: yup.string().oneOf(['USD', 'EUR'], 'Invalid currency').required(),

  donationType: yup
    .string()
    .oneOf(['USER', 'ORGANIZATION'])
    .required('Donation type is required'),
});

export type DonationFormValues = yup.InferType<typeof donationSchema>;
