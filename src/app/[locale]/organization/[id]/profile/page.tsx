import { notFound } from 'next/navigation';
import { getOrganizationById } from '@/services/organizationService';
import { OrganizationDetailedProps, Tlocale } from '@/types';
import { Metadata } from 'next';
import React, { cache, JSX } from 'react';
import { OrganizationProfile } from '@/components';

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
  const { id } = await params;

  const organization = await fetchOrganizationById(id);

  return {
    title: organization?.name,
    description: `This is the profile page for organization ${organization?.name}`,
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
  return <OrganizationProfile organization={organization} />;
}
