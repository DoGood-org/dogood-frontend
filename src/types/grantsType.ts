export interface IGrantsItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
}
export interface IGrantsList {
  items: IGrantsItem[];
  className?: string;
}

interface IReviewAuthor {
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
