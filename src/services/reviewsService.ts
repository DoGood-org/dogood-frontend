import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { IReviewsListApiResponse } from '@/types/globalReviews';
import { ReviewsFormData } from '@/types/globalReviews';

export const sendReview = async (
  formData: ReviewsFormData
): Promise<FetchResult<ReviewsFormData>> => {
  return await fetchFromApi<ReviewsFormData>('/reviews/users', {
    method: 'POST',
    data: formData,
    auth: true,
  });
};

export const getPlatformReviews = async (): Promise<
  FetchResult<IReviewsListApiResponse>
> => {
  return fetchFromApi<IReviewsListApiResponse>('/reviews/platform', {
    method: 'GET',
  });
};
