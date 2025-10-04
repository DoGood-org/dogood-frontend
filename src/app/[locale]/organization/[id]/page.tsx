import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ id: string; locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  if (!id) {
    return {
      title: t('notFoundTitle'),
      description: t('notFountDescr'),
    };
  }

  return {
    title: id,
  };
}

export default async function OrganizationPage({
  params,
}: Props): Promise<JSX.Element> {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p>organization page: {id}</p>
    </div>
  );
}
