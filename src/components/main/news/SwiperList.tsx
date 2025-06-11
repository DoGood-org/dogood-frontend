'use client';
import React from 'react';
import NewsItem from '@/components/main/news/NewsItem';
import { INewsItem } from '@/types/news.interface';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

type Props = {
  newsItems: INewsItem[];
  swiperContainerClass: string;
  prevClass: string;
  nextClass: string;
  paginationClass: string;
  bulletClass: string;
  bulletActiveClass: string;
};

export const SwiperList: React.FC<Props> = (props) => {
  return (
    <div className={`${props.swiperContainerClass}`}>
      <Swiper
        observer={true}
        observeParents={true}
        autoHeight
        loop
        modules={[Navigation, Pagination]}
        keyboard={{
          enabled: true,
        }}
        allowTouchMove={true}
        mousewheel={true}
        slidesPerView={3}
        slidesPerGroup={1}
        speed={1000}
        spaceBetween={0}
        direction="vertical"
        navigation={{
          prevEl: `.${props.prevClass}`,
          nextEl: `.${props.nextClass}`,
        }}
        pagination={{
          el: `.${props.paginationClass}`,
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${props.bulletClass} ${className}">${index + 1}</span>`;
          },
        }}
        edgeSwipeDetection={true}
        onResize={(swiper) => swiper.update()}
        breakpoints={{
          1920: {
            slidesPerView: 4,
            direction: 'horizontal',
            spaceBetween: 16,
            edgeSwipeDetection: true,
          },
        }}
        className=" w-full h-full cursor-all-scroll "
      >
        {props.newsItems.map((item) => (
          <SwiperSlide
            key={item.id}
            className="h-full flex items-center justify-center"
          >
            <NewsItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
