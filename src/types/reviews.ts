export interface ReviewsFormData {
  targetUserId: string;
  rating: null | number;
  comment?: string;
}

export interface ReviewsResponse {
  status: string;
  message: string;
  data: {
    targetUserId: string;
    rating: null | number;
    comment?: string;
  };
}
