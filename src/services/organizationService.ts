import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
// import { mockOrganization } from '@/data/mockOrganization';
import { OrganizationApiResponse, OrganizationDetailedProps } from '@/types';
import { DeleteOrgResponse } from '@/types/settings';
import { apiRoutes } from '@/lib/server/apiRoutes';

export const getOrganizationById = async (
  id: string | number
): Promise<FetchResult<OrganizationDetailedProps>> => {
  const result = await fetchFromApi<OrganizationApiResponse>(
    apiRoutes.organizations.getById(id),
    { method: 'GET' }
  );

  if (!result.ok) {
    return result;
  }

  return {
    ok: true,
    data: result.data.data.organization,
  };
};

// export const getOrganizationById = async (
//   id: string | number
// ): Promise<OrganizationDetailedProps> => {
//   // const response =
//   // return await fetchFromApi<OrganizationDetailedProps>(
//   //   apiRoutes.organizations.getById(id),
//   //   {
//   //     method: 'GET',
//   //   }
//   // );

//   // const { organization } = response;

//   const organization = mockOrganization.find(
//     (organization) => organization.id === id
//   );

//   if (!organization) throw new Error('Organization not found in API response.');

//   return organization;
// };

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
