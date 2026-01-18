import * as yup from 'yup';

export const basicInfoSchema = yup.object({
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
    .required('Start date is required'),
  finishDate: yup
    .date()
    .typeError('Finish date is required')
    .min(yup.ref('startDate'), 'Finish date cannot be earlier than start date')
    .required('Finish date is required'),
  time: yup
    .string()
    .trim()
    .required('Time is required')
    .test('valid-format', 'Invalid time format', (val) => {
      if (!val) return false;
      const [h, m] = val.split('-');
      if (!h || !m) return false;
      const hNum = parseInt(h, 10);
      const mNum = parseInt(m, 10);
      return hNum >= 0 && hNum <= 23 && (mNum === 0 || mNum === 30);
    }),
});

export type BasicInfoFormValues = yup.InferType<typeof basicInfoSchema>;
