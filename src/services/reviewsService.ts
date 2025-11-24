import { fetchFromApi } from '@/lib/apiFetcher';
import { ReviewsFormData, ReviewsResponse } from '@/types/reviews';

export const sendReview = async (
  formData: ReviewsFormData
): Promise<ReviewsResponse> => {
  const response = await fetchFromApi<ReviewsResponse>('/reviews/users', {
    method: 'POST',
    data: formData,
    auth: true,
  });
  if (response.ok) {
    return response.data;
  } else {
    throw {
      status: 'error',
      message: response.errorMessage,
      data: null,
    };
  }
};
