import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { IAdminReviews } from '@/types/admin';
import { IReviewsListApiResponse } from '@/types/globalReviews';
import { ReviewsFormData } from '@/types/globalReviews';
import { cookies } from 'next/headers';

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

// ============================================
// Response Interfaces
//
export interface IGetAllReviewsResponse {
  status: string;
  code: string;
  data: {
    reviews: IAdminReviews[];
  };
}
/**
 * Get all reviews for admin panel.
 * GET /reviews/admin/all
 */
// export const getAllReviewsService = async (): Promise<
//   FetchResult<IGetAllReviewsResponse>
// > => {
//   return fetchFromApi<IGetAllReviewsResponse>('/reviews/admin/all', {
//     method: 'GET',
//     auth: true,
//   });
// };
export const getAllReviewsService = async (): Promise<
  FetchResult<IGetAllReviewsResponse>
> => {
  const cookieStore = await cookies();

  return fetchFromApi<IGetAllReviewsResponse>('/reviews/admin/all', {
    method: 'GET',
    auth: true,
    headers: {
      cookie: cookieStore.toString(),
    },
  });
};
