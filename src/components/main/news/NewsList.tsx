import React, { JSX } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperList } from '@/components';

import { LinkWithArrow } from '@/components/ui/LinkWithArrow';
import { Section } from '@/components/ui/Section';
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchNews } from '@/services/newsFacade';
import { Tlocale } from '@/types';

export const NewsList = async (): Promise<JSX.Element> => {
  const locale = (await getLocale()) as Tlocale;
  const t = await getTranslations('news');
  const news = await fetchNews(locale);

  return (
    <Section
      withContainer={true}
      className=" mx-auto w-full bg-background text-foreground py-[40px]"
    >
      <h2
        className="text-foreground text-h2 font-normal
        lg:text-h2-d
        "
      >
        {t('newsListMain.title')}
      </h2>

      <SwiperList
        newsItems={news}
        swiperContainerClass="h-[425px] my-10"
        prevClass="prevNews"
        nextClass="nextNews"
        paginationClass="news-pagination"
        bulletClass="news-pagination-bullet"
        bulletActiveClass="news-pagination-bullet-active"
      />

      <div className="mt-4 flex justify-end">
        <LinkWithArrow href="/news" text={t('newsListMain.seeAll')} />
      </div>
    </Section>
  );
};
