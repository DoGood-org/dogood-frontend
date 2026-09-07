import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '@/services/notificationService';
import { useNotificationStore } from '@/zustand/stores/notificationStore';

const NOTIFICATIONS_KEY = 'notifications';
const PAGE_LIMIT = 20;

export const useNotifications = (): {
  isLoading: boolean;
  isError: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  loadMore: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
} => {
  const queryClient = useQueryClient();
  const { setNotifications, appendNotifications } = useNotificationStore();
  const notificationsCount = useNotificationStore(
    (s) => s.notifications.length
  );

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const query = useQuery({
    queryKey: [NOTIFICATIONS_KEY, page],
    queryFn: async () => {
      const result = await getNotifications(page, PAGE_LIMIT);
      if (!result.ok) throw new Error(result.errorMessage);
      return result.data;
    },
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!query.data) return;
    setTotal(query.data.total);
    if (query.data.page === 1) {
      setNotifications(query.data.notifications);
    } else {
      appendNotifications(query.data.notifications);
    }
  }, [query.data, setNotifications, appendNotifications]);

  const hasMore = notificationsCount < total;

  const loadMore = (): void => {
    if (!query.isFetching && hasMore) setPage((p) => p + 1);
  };

  const resetPages = (): void => {
    setPage(1);
    queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
  };

  const markAsRead = useMutation({
    mutationFn: markNotificationAsRead,
    onMutate: (id) => useNotificationStore.getState().markAsRead(id),
    onSettled: resetPages,
  });

  const markAllAsRead = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onMutate: () => useNotificationStore.getState().markAllAsRead(),
    onSettled: resetPages,
  });

  const remove = useMutation({
    mutationFn: deleteNotification,
    onMutate: (id) => useNotificationStore.getState().deleteNotification(id),
    onSettled: resetPages,
  });

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    isFetchingMore: query.isFetching && !query.isLoading,
    hasMore,
    loadMore,
    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
    deleteNotification: remove.mutate,
  };
};
