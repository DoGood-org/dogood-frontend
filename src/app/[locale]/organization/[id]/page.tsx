import type { JSX } from 'react/jsx-runtime';
import type { Tlocale } from '@/types/locale';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchOrganizationById } from '@/facades/organizationFacade';
import { OrganizationLayout } from '@/components/organization/OrganizationLayout';

interface Props {
  params: Promise<{ id: string; locale: Tlocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const organization = await fetchOrganizationById(id);

  return {
    title: organization?.name,
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
