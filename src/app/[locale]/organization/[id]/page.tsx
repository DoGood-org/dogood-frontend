import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OrganizationLayout } from '@/components';
import { notFound } from 'next/navigation';
import { fetchOrganizationById } from '@/facades/organizationFacade';

interface Props {
  params: Promise<{ id: string; locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  const organization = await fetchOrganizationById(id);

  if (!organization) {
    return {
      title: t('notFoundTitle'),
      description: t('notFountDescr'),
    };
  }

  return {
    title: organization.name,
  };
}

export default async function OrganizationPage({
  params,
}: Props): Promise<JSX.Element> {
  const { id } = await params;

  const organization = await fetchOrganizationById(id);

  if (!organization) {
    notFound();
  }

  return <OrganizationLayout organization={organization} />;
}
