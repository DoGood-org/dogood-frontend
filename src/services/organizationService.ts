import { mockOrganization } from '@/data/mockOrganization';
import { OrganizationDetailedProps } from '@/types';
// import { fetchFromApi } from '@/lib/apiFetcher';

export const getOrganizationById = async (
  id: string | number
): Promise<OrganizationDetailedProps> => {
  // const response = await fetchFromApi(`/organization/${id}`, {
  //   method: 'GET',
  // });

  // const { organization } = response;

  const organization = mockOrganization.find(
    (organization) => organization.id === id
  );

  if (!organization) throw new Error('Organization not found in API response.');

  return organization;
};
