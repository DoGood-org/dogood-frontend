import { fetchFromApi } from '@/lib/apiFetcher';
import { ReviewsFormData, ReviewsResponse } from '@/types/reviews';

export const sendReview = async (
  formData: ReviewsFormData
): Promise<ReviewsResponse> => {
  const response = await fetchFromApi<ReviewsResponse>('/reviews', {
    method: 'POST',
    data: formData,
    auth: true,
  });
  return response;
};
