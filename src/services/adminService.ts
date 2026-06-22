import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { apiRoutes } from '@/lib/server/apiRoutes';
import { IAdminOrganizationsResponse } from '@/types/admin';

export const getAllOrganizations = async (
  page = 1,
  limit = 6,
  search = ''
): Promise<FetchResult<IAdminOrganizationsResponse>> => {
  return await fetchFromApi<IAdminOrganizationsResponse>(
    apiRoutes.admin.getAllOrg,
    {
      method: 'GET',
      auth: true,
      params: {
        page,
        limit,
        search,
      },
    }
  );
};
