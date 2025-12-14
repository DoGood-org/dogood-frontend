import { fetchFromApi, FetchResult } from '@/lib/apiFetcher';
import { ITaskDetails } from '@/types/tasks.type';

interface ITasksApiResponse {
  data: ITaskDetails[];
}

export const getOtherTasksService = async (
  userId: number
): Promise<FetchResult<ITasksApiResponse>> => {
  return fetchFromApi<ITasksApiResponse>(`/api/tasks/other/${userId}`, {
    method: 'GET',
    auth: true,
  });
};
