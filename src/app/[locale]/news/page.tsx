import { NewsItem } from '@/components/main/news/NewsItem';
import { getNews } from '@/services/newsService';
import { INewsItem, Tlocale } from '@/types';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: Tlocale }>;
};

const NewsPage = async ({ params }: Props): Promise<React.ReactElement> => {
  const { locale } = await params;
  const newsResult = await getNews(locale);
  const t = await getTranslations({ locale, namespace: 'news' });

  if (!newsResult.ok) {
    return (
      <p className="flex items-center justify-center h-[300px]">
        {t('news.loadError')}
      </p>
    );
  }

  const newsItems: INewsItem[] = newsResult.data?.data?.posts ?? [];
  return (
    <div
      className=" 
      bg-background
      px-[4px]
      pt-[168px]
      pb-[64px]
      my-container
      w-full
      min-h-[calc(100dvh-188px)]
      text-foreground  
  "
    >
      <div
        className="
          grid 
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6 
        "
      >
        {newsItems.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
