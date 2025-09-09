import * as yup from 'yup';

const MIN_AGE = 13;
const today = new Date();
const minBirthDate = new Date(
  today.getFullYear() - MIN_AGE,
  today.getMonth(),
  today.getDate()
);

export const settingsSchema = yup.object().shape({
  name: yup.string().optional(),
  bio: yup.string().optional(),
  avatar: yup.string().url('Invalid image URL').optional(),
  location: yup
    .object()
    .shape({
      country: yup.string().optional(),
      region: yup.string().optional(),
      city: yup.string().optional(),
    })
    .optional(),
  gender: yup
    .string()
    .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Invalid gender')
    .optional(),
  birthDate: yup
    .date()
    .optional()
    .max(minBirthDate, `You must be at least ${MIN_AGE} years old`),
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9\s\-\(\)]{7,}$/, 'Invalid phone number')
    .optional(),
  paymentOptionIds: yup
    .array()
    .of(yup.number().integer().positive('Invalid payment option'))
    .optional(),
});

export type SettingsFormValues = yup.InferType<typeof settingsSchema>;
