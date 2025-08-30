export interface INewsItem {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  category: string;
  tags: string[];
  content: string;
}

export interface INewsListApiResponse {
  status: string;
  count: number;
  data: {
    posts: INewsItem[];
  };
}

export interface INewsItemApiResponse {
  status: string;
  data: {
    post: INewsItem;
  };
}
