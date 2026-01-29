import * as yup from 'yup';

export const basicInfoSchema = yup.object({
  organizationId: yup.string().nullable(),
  picture: yup.string().required('Picture is required'),
  title: yup
    .string()
    .trim()
    .required('Title is required')
    .max(100, 'Title must be at most 100 characters'),
  location: yup
    .string()
    .trim()
    .required('Location is required')
    .max(150, 'Location must be at most 150 characters'),
  startDate: yup
    .date()
    .typeError('Start date is required')
    .nullable()
    .required('Start date is required'),
  finishDate: yup
    .date()
    .typeError('Finish date is required')
    .min(yup.ref('startDate'), 'Finish date cannot be earlier than start date')
    .nullable()
    .required('Finish date is required'),
  description: yup
    .string()
    .trim()
    .max(500, 'Maximum 500 characters')
    .required('Description is required'),
  time: yup
    .string()
    .trim()
    .required('Time is required')
    .matches(
      /^([0-9]|1[0-9]|2[0-3])-(00|05|10|15|20|25|30|35|40|45|50|55)$/,
      'Invalid time format'
    ),
});

export type BasicInfoFormValues = yup.InferType<typeof basicInfoSchema>;
