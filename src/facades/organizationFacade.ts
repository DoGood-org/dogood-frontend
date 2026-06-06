import {
  getOrganizationById,
  getOrganizationsByName,
} from '@/services/organizationService';
import { OrganizationDetailedProps } from '@/types';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const fetchOrganizationById = cache(
  async (id: string): Promise<OrganizationDetailedProps> => {
    const result = await getOrganizationById(id);

    if (!result.ok) {
      notFound();
    }

    return result.data;
  }
);

export const fetchOrganizationsByName = cache(
  async (name: string): Promise<OrganizationDetailedProps[]> => {
    const result = await getOrganizationsByName(name);

    if (!result.ok) {
      notFound();
    }

    return result.data;
  }
);
