'use client';
import { INewsItem } from '@/types';
import { NewsItem } from '@/components/main/news/NewsItem';

type Props = {
  newsItems: INewsItem[];
};

export const NewsScrollList: React.FC<Props> = ({ newsItems }) => {
  return (
    <div className="flex overflow-x-auto flex-nowrap h-[425px] my-10 pb-5 scrollbar-hide scroll-smooth">
      {newsItems.map((item) => (
        <div key={item.id} className="flex-shrink-0 w-[320px]">
          <NewsItem item={item} />
        </div>
      ))}
    </div>
  );
};
