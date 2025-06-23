'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { NewsItem } from '@/components/main/news/NewsItem';
import { INewsItem } from '@/types/news.interface';

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
type NewsSlideTabletProps = {
  newsItems: INewsItem[];
  containerClass?: string;
};

export const NewsSlideTablet: React.FC<NewsSlideTabletProps> = ({
  newsItems,
  containerClass,
}) => {
  const chunks = chunk(newsItems, 4);

  return (
    <div className={`${containerClass}`}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="w-full h-auto"
      >
        {chunks.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="hidden md:grid md:grid-cols-2 gap-5 lg:hidden">
              {group.map((item) => (
                <NewsItem key={item.id} item={item} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
