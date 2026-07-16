import { JoinRequestStatus } from '@/constants/joinRequests';
import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { apiRoutes } from '@/lib/server/apiRoutes';
import {
  ICreateJoinRequestResponse,
  IJoinRequestResponse,
  IJoinRequests,
  IJoinRequestApiData,
} from '@/types/joinRequest.type';

export const createJoinRequest = async (
  data: IJoinRequestApiData
): Promise<FetchResult<IJoinRequests>> => {
  const result = await fetchFromApi<ICreateJoinRequestResponse>(
    apiRoutes.joinRequests.create,
    {
      method: 'POST',
      data,
      auth: true,
    }
  );

  if (!result.ok) return result;

  return {
    ok: true,
    data: result.data.data.joinRequest,
  };
};

export const getJoinRequests = async (
  id: string
): Promise<FetchResult<IJoinRequests[]>> => {
  const result = await fetchFromApi<IJoinRequestResponse>(
    apiRoutes.joinRequests.getJoinRequests(id),
    { method: 'GET', auth: true }
  );

  console.log('JOIN REQUESTS RESULT:', result);

  if (!result.ok) return result;

  return {
    ok: true,
    data: result.data?.data?.joinRequests ?? [],
  };
};

export const updateJoinRequestStatus = async (
  id: string,
  status: JoinRequestStatus
): Promise<FetchResult<IJoinRequests>> => {
  const result = await fetchFromApi<ICreateJoinRequestResponse>(
    apiRoutes.joinRequests.updateStatus,
    {
      method: 'PATCH',
      auth: true,
      data: {
        id,
        status,
      },
    }
  );

  if (!result.ok) return result;

  return {
    ok: true,
    data: result.data.data.joinRequest,
  };
};
