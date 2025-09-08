import * as yup from 'yup';

const MIN_AGE = 13;
const today = new Date();
const minBirthDate = new Date(
  today.getFullYear() - MIN_AGE,
  today.getMonth(),
  today.getDate()
);

export const settingsSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  avatar: yup.string().url('Invalid image URL').required('Avatar is required'),
  location: yup
    .object()
    .shape({
      country: yup.string().required('Country is required'),
      region: yup.string().required('Region is required'),
      city: yup.string().required('City is required'),
    })
    .required(),
  gender: yup
    .string()
    .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Invalid gender')
    .required('Gender is required'),
  birthDate: yup
    .date()
    .required('Birth date is required')
    .max(minBirthDate, `You must be at least ${MIN_AGE} years old`),
  phoneNumber: yup
    .string()
    .matches(/^\+?[0-9\s\-\(\)]{7,}$/, 'Invalid phone number')
    .required('Phone number is required'),
  paymentOptionIds: yup
    .array()
    .of(yup.number().integer().positive('Invalid payment option'))
    .required('Payment option is required'),
});
export type SettingsFormValues = yup.InferType<typeof settingsSchema>;
