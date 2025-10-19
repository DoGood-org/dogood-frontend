import { fetchFromApi } from '@/lib/apiFetcher';
import { ITaskDetails } from '@/types/tasks.type';

interface ITasksApiResponse {
  data: ITaskDetails[];
}

export const getOtherTasksService = async (
  userId: number
): Promise<ITaskDetails[]> => {
  const response = await fetchFromApi<ITasksApiResponse>(
    `/api/tasks/other/${userId}`,
    {
      method: 'GET',
      auth: true,
    }
  );
  return response.data || [];
};
