import { TaskCategoryEnum } from '@/types/createTask.type';
import * as yup from 'yup';

export const basicInfoSchema = yup.object({
  picture: yup.string().nullable().defined().default(null),
  title: yup
    .string()
    .required('Title is required')
    .trim()
    .max(100, 'Title must be at most 100 characters')
    .min(3, 'Title must be at least 3 characters'),
  location: yup
    .object({
      lat: yup.number().required(),
      lng: yup.number().required(),
    })
    .nullable()
    .default(null),
  locationName: yup.string().trim().required('Location is required'),
  startDate: yup.date().nullable().required('Start date is required'),
  endDate: yup
    .date()
    .nullable()
    .required('Finish date is required')
    .min(yup.ref('startDate'), 'Finish date cannot be before start date'),
  description: yup
    .string()
    .required('Description is required')
    .max(500, 'Maximum 500 characters')
    .min(5, 'Title must be at least 3 characters'),
  startTime: yup
    .string()
    .required('Time is required')
    .matches(
      /^([0-9]|1[0-9]|2[0-3])-(00|05|10|15|20|25|30|35|40|45|50|55)$/,
      'Invalid time format'
    ),
  category: yup
    .array()
    .of(
      yup
        .mixed<TaskCategoryEnum>()
        .oneOf(Object.values(TaskCategoryEnum))
        .defined()
    )
    .required('Category is required')
    .min(1, 'Category must have at least one item'),
  amount: yup
    .number()
    .transform((originalValue) =>
      originalValue === '' ? undefined : Number(originalValue)
    )
    .typeError('Amount must be a number')
    .required('Amount is required')
    .min(0, 'Amount must be at least 0'),
  currency: yup
    .string()
    .oneOf(['USD', 'EUR'] as const)
    .required('Currency is required'),
  requirements: yup
    .string()
    .defined()
    .max(300, 'Maximum 300 characters')
    .min(5, 'Requirements must be at least 5 characters'),
  isOrganization: yup.boolean().required(),
  organizationId: yup.string().uuid().nullable().default(null),
});

export type BasicInfoFormValues = yup.InferType<typeof basicInfoSchema>;

export const defaultTaskValues: BasicInfoFormValues = {
  picture: null,
  title: '',
  location: null,
  locationName: '',
  startDate: new Date(),
  endDate: new Date(),
  description: '',
  startTime: '',
  category: [],
  amount: 0,
  currency: 'USD',
  requirements: '',
  isOrganization: false,
  organizationId: null,
};
