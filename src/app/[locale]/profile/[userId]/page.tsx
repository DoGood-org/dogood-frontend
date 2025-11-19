import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PublicAccount } from '@/components';
import { fetchUserById } from '@/facades/profileFacade';

interface Props {
  params: Promise<{ userId: string; locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId, locale } = await params;

  const t = await getTranslations({ locale, namespace: 'common' });

  const user = await fetchUserById(userId);

  if (!user) {
    return {
      title: t('notFoundTitle'),
      description: t('notFountDescr'),
    };
  }

  return {
    title: `DoGood | ${user.name}`,
    description: `DoGood | ${user.name}`,
  };
}

export default async function ProfilePage({
  params,
}: Props): Promise<JSX.Element> {
  const { userId } = await params;

  const user = await fetchUserById(userId);

  if (!user) {
    notFound();
  }

  return <PublicAccount user={user} />;
}
