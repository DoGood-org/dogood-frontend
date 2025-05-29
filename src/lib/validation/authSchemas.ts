import * as yup from 'yup';

export const registerPersonSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Repeat password is required'),
});

export const registerCompanySchema = registerPersonSchema.shape({
  companyName: yup.string().required('Company name is required'),
});

export const loginSchema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});
