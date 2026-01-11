import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TaskContent } from '@/components/tasks/TaskPage/TaskContent';
import { StripeProviderLazy } from '@/components/providers/StripeProviderLazy';
import { fetchLastNews } from '@/facades/newsFacade';

interface Props {
  params: Promise<{ slug: string; locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tasks' });

  if (!slug) {
    return {
      title: t('taskItemPage.notFoundTitle'),
      description: t('taskItem.notFoundDescription'),
    };
  }

  return {
    title: slug,
  };
}

export default async function IdTaskItemPage({
  params,
}: Props): Promise<JSX.Element> {
  const { slug, locale } = await params;

  const newsLastItems = await fetchLastNews(locale);

  return (
    <StripeProviderLazy>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <TaskContent slug={slug} newsItems={newsLastItems} />
      </div>
    </StripeProviderLazy>
  );
}
