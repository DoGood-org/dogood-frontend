export interface ReviewsFormData {
  targetUserId: number;
  rating: null | number;
  comment?: string;
}

export interface ReviewsResponse {
  status: string;
  message: string;
  data: {
    targetUserId: number;
    rating: null | number;
    comment?: string;
  };
}
