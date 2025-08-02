import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9+\-()\s]+$/, 'Invalid phone number')
    .notRequired()
    .nullable(),
  interest: yup
    .string()
    .max(200, 'Maximum 200 characters')
    .notRequired()
    .nullable(),
});
