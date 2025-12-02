'use client';

import { IExtendedITaskProps } from '@/types/tasks.type';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OtherTaskItem } from './OtherTaskItem';

interface OtherListProps {
  tasks: IExtendedITaskProps[];
}

export const OtherTaskList: React.FC<OtherListProps> = ({ tasks }) => {
  const t = useTranslations('tasks');

  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center p-6 text-gray-500 h-[235px]">
        {t('otherTask.noTasks')}
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1440: { slidesPerView: 3, spaceBetween: 24 },
        }}
        navigation={{
          nextEl: '.slider-next-btn',
          prevEl: '.slider-prev-btn',
        }}
        pagination={{
          el: '.slider-dots',
          clickable: true,
        }}
        onInit={(swiper) => {
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full max-w-[360px] sm:max-w-full"
      >
        {tasks.map((task) => (
          <SwiperSlide key={task.id}>
            <OtherTaskItem {...task} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center items-center mt-5">
        <button className="slider-prev-btn">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="slider-dots flex items-center gap-2 md:gap-3"></div>

        <button className="slider-next-btn">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};
