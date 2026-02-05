import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchUserById } from '@/facades/profileFacade';
import { PublicAccount } from '@/components/publicAccount/PublicAccount';

interface Props {
  params: Promise<{ userId: string; locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params;

  const user = await fetchUserById(userId);

  return {
    title: `DoGood | ${user?.name}`,
    description: `DoGood | ${user?.name}`,
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
