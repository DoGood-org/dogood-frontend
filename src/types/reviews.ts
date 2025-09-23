export interface ReviewsFormData {
  authorId: number;
  targetId: number;
  rating: null | number;
  comment?: string;
}

export interface ReviewsResponse {
  status: string;
  message: string;
  data: {
    authorId: number;
    targetId: number;
    rating: null | number;
    comment?: string;
  };
}
