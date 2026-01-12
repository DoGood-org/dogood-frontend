import { notFound } from 'next/navigation';
import { Tlocale } from '@/types';
import { Metadata } from 'next';
import React, { JSX } from 'react';
import { OrganizationProfile } from '@/components/organization/profilePage/OrganizationProfile';
import { fetchOrganizationById } from '@/facades/organizationFacade';

interface Props {
  params: Promise<{ id: string; locale: Tlocale }>;
}

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
