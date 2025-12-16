import { fetchFromApi, FetchResult } from '@/lib/apiFetcher';
import { mockOrganization } from '@/data/mockOrganization';
import { OrganizationDetailedProps } from '@/types';
import { DeleteOrgResponse } from '@/types/settings';

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

interface IMemberOrgValue {
  userId: string;
  organizationId: string;
}

export const removeMemberFromOrganization = async (
  data: IMemberOrgValue
): Promise<FetchResult<DeleteOrgResponse>> => {
  return fetchFromApi('/organization/members', {
    method: 'DELETE',
    data,
    auth: true,
  });
};
