import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OrganizationDetailedProps } from '@/types';
import { getOrganizationById } from '@/services/organizationService';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { OrganizationLayout } from '@/components/organization/OrganizationLayout';

interface Props {
  params: Promise<{ id: string; locale: Tlocale }>;
}

const fetchOrganizationById = cache(
  async (id: string): Promise<OrganizationDetailedProps | null> => {
    const organization = await getOrganizationById(id);

    if (!organization) notFound();
    return organization;
  }
);

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
