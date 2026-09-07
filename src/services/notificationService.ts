import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { apiRoutes } from '@/lib/server/apiRoutes';
import { Notification } from '@/types/notificationType';

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
}

export const getNotifications = async (
  page = 1,
  limit = 20
): Promise<FetchResult<NotificationsResponse>> => {
  return fetchFromApi<NotificationsResponse>(apiRoutes.notifications.getAll, {
    method: 'GET',
    auth: true,
    params: { page, limit },
  });
};

export const markNotificationAsRead = async (
  id: string
): Promise<FetchResult<void>> => {
  return fetchFromApi<void>(apiRoutes.notifications.readOne(id), {
    method: 'PATCH',
    auth: true,
  });
};

export const markAllNotificationsAsRead = async (): Promise<
  FetchResult<void>
> => {
  return fetchFromApi<void>(apiRoutes.notifications.readAll, {
    method: 'PATCH',
    auth: true,
  });
};

export const deleteNotification = async (
  id: string
): Promise<FetchResult<void>> => {
  return fetchFromApi<void>(apiRoutes.notifications.delete(id), {
    method: 'DELETE',
    auth: true,
  });
};
