import { fetchFromApi, FetchResult } from '@/lib/apiFetcher';
import { ReviewsFormData } from '@/types/reviews';

export const sendReview = async (
  formData: ReviewsFormData
): Promise<FetchResult<ReviewsFormData>> => {
  return await fetchFromApi<ReviewsFormData>('/reviews/users', {
    method: 'POST',
    data: formData,
    auth: true,
  });
};
