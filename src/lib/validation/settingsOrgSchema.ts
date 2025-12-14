import * as yup from 'yup';

export const settingsOrgSchema = yup.object().shape({
  name: yup.string().optional(),
  avatar: yup.string().url('Invalid image URL').optional(),
  location: yup
    .object()
    .shape({
      country: yup.string().optional(),
      region: yup.string().optional(),
      city: yup.string().optional(),
    })
    .optional(),
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9\s\-\(\)]{7,}$/, 'Invalid phone number')
    .optional()
    .nullable(),
  paymentOptionIds: yup
    .array()
    .of(yup.number().integer().positive('Invalid payment option'))
    .optional(),
  description: yup.string().optional(),
  moreInfo: yup.string().optional(),
});

export type SettingsOrgFormValues = yup.InferType<typeof settingsOrgSchema>;
