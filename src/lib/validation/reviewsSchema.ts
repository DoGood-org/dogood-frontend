import * as yup from 'yup';

export const reviewsSchema = yup.object().shape({
  authorId: yup.number(),
  targetId: yup.number(),
  rating: yup
    .number()
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating cannot exceed 5 stars')
    .nullable(),
  comment: yup.string().optional(),
});

export type ReviewsFormValues = yup.InferType<typeof reviewsSchema>;
