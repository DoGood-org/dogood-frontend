import * as yup from 'yup';

export const settingsSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  gender: yup.string().required('Gender is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\+?[0-9\s\-\(\)]{7,}$/, 'Please enter a valid phone number'),
  about: yup.string().max(250, 'About must has 250 characters').default(''),
  img: yup.string().default(''),
});

export type SettingsFormValues = yup.InferType<typeof settingsSchema>;
