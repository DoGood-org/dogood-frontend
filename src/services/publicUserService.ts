// import { mockPublicUsers } from '@/data/mockPublicUsers';
import { fetchFromApi } from '@/lib/apiFetcher';
import { IUserApiResponse, UserDetailedProps } from '@/types';

export const getUserById = async (
  id: string | number
): Promise<UserDetailedProps> => {
  const response = await fetchFromApi<IUserApiResponse>(`/user/profile/${id}`, {
    method: 'GET',
  });

  const { user } = response;

  // const user = mockPublicUsers.find((user) => user.id == id);

  if (!user) throw new Error('User not found in API response.');

  return user;
};
