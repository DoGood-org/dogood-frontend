import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { apiRoutes } from '@/lib/server/apiRoutes';

export type DirectionRequest = 'FROM_USER' | 'FROM_ORGANIZATION';
export type JoinRequestStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED';

export interface JoinRequestApiData {
  senderId: string | number;
  receiverOrganizationId: string;
  receiverUserId?: string;
  direction: DirectionRequest;
  status?: JoinRequestStatus;
}

export const createJoinRequest = async (
  data: JoinRequestApiData
): Promise<FetchResult<JoinRequestApiData>> => {
  return fetchFromApi<JoinRequestApiData>(apiRoutes.joinRequests.create, {
    method: 'POST',
    data,
    auth: true,
  });
};
