import * as yup from 'yup';

export const rejectTaskSchema = yup
  .object()
  .shape({ rejectionReason: yup.string().optional() });

export type rejectTaskFormValues = yup.InferType<typeof rejectTaskSchema>;
