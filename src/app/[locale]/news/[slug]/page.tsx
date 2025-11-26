import type { JSX } from 'react/jsx-runtime'; // ✅ correct
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getNewsById } from '@/services/newsService';
import { notFound } from 'next/navigation';
import { INewsItem, INewsItemApiResponse } from '@/types';
import { cache } from 'react';
import { newsFormatDate } from '@/utils/newsFormatDate';

interface Props {
  params: Promise<{ slug: string; locale: Tlocale }>;
}

const fetchNewsItem = cache(
  async (slug: string, locale: Tlocale): Promise<INewsItem | null> => {
    const result = await getNewsById(slug, locale);

    if (!result.ok) {
      return null;
    }
    const apiItem: INewsItemApiResponse = result.data;
    return apiItem.data.post ?? null;
  }
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });

  const newsItem = await fetchNewsItem(slug, locale);

  if (!newsItem) {
    return {
      title: t('newsItemPage.notFoundTitle'),
      description: t('newsItem.notFoundDescription'),
    };
  }

  return {
    title: t('newsItemPageMeta.title', { title: newsItem.title }),
    description: t('newsItemPageMeta.description', { title: newsItem.title }),
  };
}

export default async function IdNewsItemPage({
  params,
}: Props): Promise<JSX.Element> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });

  const newsItem = await fetchNewsItem(slug, locale);

  if (!newsItem) {
    notFound();
  }

  const { title = '', content = '', image, createdAt } = newsItem;

  return (
    <div
      className=" 
bg-[var(--background)]
    px-[4px]
    pt-[168px]
pb-[64px]
my-container
w-full
min-h-[calc(100dvh-188px)]
text-foreground
flex
flex-col
items-center
justify-center
"
    >
      <h2 className="text-foreground">{t('newsItemPage.title', { title })}</h2>
      <p className="text-foreground">{newsFormatDate(createdAt)}</p>
      <h3 className="text-foreground">{title}</h3>
      <p className="mb-6">{content}</p>
      {image && (
        <Image
          src={image}
          alt={title}
          className="w-full h-auto max-w-[600px] mb-4"
          width={600}
          height={400}
        />
      )}
    </div>
  );
}
