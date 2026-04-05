// import { mockPublicUsers } from '@/data/mockPublicUsers';
import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
// import { getApiInstance } from '@/lib/api/getApiInstanse';
import { apiRoutes } from '@/lib/server/apiRoutes';
import { IUserApiResponse, UserShort } from '@/types';
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

export const searchUsersByName = async (name: string): Promise<UserShort[]> => {
  if (!name) return [];

  // console.log(getApiInstance(true).defaults.baseURL);

  const result: FetchResult<{
    status: string;
    code: string;
    message: string;
    data: { users: UserShort[] };
  }> = await fetchFromApi('user/name', {
    method: 'POST',
    data: { name },
    auth: true,
  });

  if (!result.ok) {
    // console.error('Search API error', result);
    return [];
  }

  // console.log('RESDATA => ', result.data);

  return result.data.data.users;

  // const res = await fetchFromApi<UserShort[]>(apiRoutes.user.usersByName, {
  //   method: 'POST',
  //   data: { name },
  //   auth: true,
  // });

  // if (!res.ok) {
  //   console.log(res);

  //   throw new Error(res.errorMessage);
  // }

  // console.log('RESDATA => ', res.data);

  // return res.data;
};
