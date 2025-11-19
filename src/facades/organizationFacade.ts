import { getOrganizationById } from '@/services/organizationService';
import { OrganizationDetailedProps } from '@/types';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const fetchOrganizationById = cache(
  async (id: string): Promise<OrganizationDetailedProps | null> => {
    const organization = await getOrganizationById(id);

    if (!organization) notFound();
    return organization;
  }
);
