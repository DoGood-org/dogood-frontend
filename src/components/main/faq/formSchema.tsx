import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .required()
    .matches(/^[0-9+\-()\s]+$/, 'Invalid phone number'),
  interest: yup.string().required().max(200, 'Maximum 200 characters'),
});
