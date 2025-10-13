import * as yup from 'yup';

export const donationSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required('Full name is required')
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
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Amount must be greater than 0')
    .max(10_000, 'Amount too large'),

  currency: yup.string().oneOf(['USD', 'EUR']).required(),

  donationType: yup
    .string()
    .oneOf(['USER', 'ORGANIZATION'])
    .default('USER')
    .required('Donation type is required'),
});

export type DonationFormValues = yup.InferType<typeof donationSchema>;
