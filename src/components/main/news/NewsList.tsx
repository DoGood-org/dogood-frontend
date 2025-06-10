import NewsItem from '@/components/main/news/NewsItem';
import { INewsItem } from '@/types/newsItemType';
import React from 'react';
import news1 from '@/assets/images/news/news1.png';
import news2 from '@/assets/images/news/news2.png';
import news3 from '@/assets/images/news/news3.png';

export const newsMock: INewsItem[] = [
  {
    id: '1',
    title: 'Kindness That Speaks Without Words',
    img: news1,
    date: '2023-10-01T12:00:00Z',
  },
  {
    id: '2',
    title: 'The Hidden Side of Healthcare: The Role of Giving',
    img: news2,
    date: '2023-10-02T12:00:00Z',
  },
  {
    id: '3',
    title: 'When Helping Isn’t a Trend — It’s a Daily Choice',
    img: news3,
    date: '2023-10-03T12:00:00Z',
  },
];

export const NewsList: React.FC = () => {
  const lengthNewsToDisplay = 3;

  if (!newsMock || newsMock.length === 0) {
    return <div>No news available</div>;
  }

  return (
    <section className="mx-auto w-full ">
      <div className="my-container py-[100px]">
        <h2>Last news, stories and blog posts</h2>
        <ul className="news-list grid grid-cols-1 gap-[24px] px-[20px] md:grid-cols-2 lg:grid-cols-3">
          {newsMock.slice(0, lengthNewsToDisplay).map((item) => (
            <li key={item.id} className="flex flex-col justify-center">
              <NewsItem
                id={item.id}
                title={item.title}
                img={item.img}
                date={item.date}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
