'use client';
import React from 'react';
import { NewsItem } from '@/components/main/news/NewsItem';
import { INewsItem } from '@/types/news.interface';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid } from 'swiper/modules';

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
        className="w-full h-[1323px] md:hidden lg:block "
        observer={true}
        observeParents={true}
        loop={false}
        modules={[Navigation, Pagination, Grid]}
        keyboard={{
          enabled: true,
        }}
        allowTouchMove={true}
        mousewheel={true}
        slidesPerView={3}
        slidesPerGroup={1}
        speed={1000}
        spaceBetween={0}
        direction="horizontal"

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
        updateOnWindowResize={true}

        breakpoints={{
          0: {
            slidesPerView: 3,
            direction: 'vertical',

          },
          768: {
            allowTouchMove: false,
            slidesPerView: 1,
            direction: 'vertical',
            spaceBetween: 0,
          },

          1440: {
            allowTouchMove: true,

            slidesPerView: 4,
            direction: 'horizontal',
            spaceBetween: 16,
          },
        }}
      >
        {props.newsItems.map((item) => (
          <SwiperSlide key={item.id} className='w-full'>
            <NewsItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};


