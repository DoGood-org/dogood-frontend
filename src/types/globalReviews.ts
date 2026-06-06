export interface IReviewAuthor {
  id: string;
  name: string;
  avatar: string;
}

export interface IReview {
  id: number;
  rating: number;
  comment: string;
  authorType: string;
  targetType: string;
  status: string;
  createdAt: string;
  author: IReviewAuthor;
}

export interface IReviewsList {
  reviews: IReview[];
}
export interface IReviewsListApiResponse {
  status: string;
  code: string;
  data: {
    reviews: IReview[];
  };
}

export interface ReviewsFormData {
  targetUserId: string;
  rating: null | number;
  comment?: string;
}
