import * as yup from 'yup';

const baseOrgSchema = {
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
    .optional()
    .transform((value) => (value === '' ? undefined : value))
    .matches(/^\+?[0-9\s\-\(\)]{7,}$/, 'Invalid phone number')
    .nullable(),
  email: yup.string().email().optional(),
  stripeCustomerId: yup.string().optional(),
  description: yup
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  moreInfo: yup
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
};

// For creation - organizationName is required
export const createOrgSchema = yup.object().shape({
  name: yup.string().required('Organization name is required'),
  ...baseOrgSchema,
});

// For updates - organizationName is optional
export const updateOrgSchema = yup.object().shape({
  name: yup.string().optional(),
  ...baseOrgSchema,
});

export type CreateOrgFormValues = yup.InferType<typeof createOrgSchema>;
export type UpdateOrgFormValues = yup.InferType<typeof updateOrgSchema>;

export type SettingsOrgFormValues = CreateOrgFormValues | UpdateOrgFormValues;
