export interface INewsItem {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  category?: string;
  tags?: string[];
}

export interface INewsApiResponse {
  status: string;
  count: number;
  data: {
    posts: INewsItem[];
  };
}
