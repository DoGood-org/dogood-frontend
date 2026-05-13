import * as yup from 'yup';

export const donationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('First name is required')
    .min(2, 'First name is too short')
    .max(100, 'First name must be at most 100 characters'),

  lastName: yup
    .string()
    .trim()
    .required('Last name is required')
    .min(2, 'Last name is too short')
    .max(100, 'Last name must be at most 100 characters'),

  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email address'),

  postCode: yup.string().trim().max(20, 'Post code is too long'),

  country: yup.string().trim().max(56, 'Country name is too long'),

  streetAddress: yup.string().trim().max(200, 'Street address is too long'),

  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Amount must be greater than 0'),

  currency: yup.string().oneOf(['USD', 'EUR'], 'Invalid currency').required(),

  donationType: yup
    .string()
    .oneOf(['USER', 'ORGANIZATION', 'PROJECT', 'LINE'])
    .required('Donation type is required'),

  selectedPaymentMethodId: yup.string().trim().nullable().optional(),

  emailUpdates: yup.boolean().required(),

  textMessages: yup.boolean().required(),

  communityEmailUpdates: yup.boolean().required(),

  communityTextMessages: yup.boolean().required(),

  hideNamePublicly: yup.boolean().required(),
});

export type DonationFormValues = yup.InferType<typeof donationSchema>;
