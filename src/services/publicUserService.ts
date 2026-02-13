// import { mockPublicUsers } from '@/data/mockPublicUsers';
import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { apiRoutes } from '@/lib/server/apiRoutes';
import { IUserApiResponse } from '@/types';
// import { fetchFromApi } from '@/lib/apiFetcher';
// import { IUserApiResponse, UserDetailedProps } from '@/types';

export const getUserById = async (
  id: string | number
): Promise<FetchResult<IUserApiResponse>> => {
  // const response =
  return fetchFromApi<IUserApiResponse>(apiRoutes.user.getById(id), {
    method: 'GET',
  });

  // const { user } = response;

  // const user = mockPublicUsers.find((user) => user.id == id);

  // if (!user) throw new Error('User not found in API response.');

  // return user;
};
