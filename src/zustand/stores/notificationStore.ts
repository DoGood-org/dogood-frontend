import { create } from 'zustand';
import { Notification } from '@/types/notificationType';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'join_organization',
    title: 'Request to join organization',
    text: 'Green Future wants you to join their organization as a volunteer.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    meta: { organizationId: 'org-1', organizationName: 'Green Future' },
  },
  {
    id: '2',
    type: 'task_completion',
    title: 'Task completed',
    text: 'Your task "Plant 100 trees" has been marked as completed.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    meta: { taskId: 'task-1', taskName: 'Plant 100 trees' },
  },
  {
    id: '3',
    type: 'review_confirmation',
    title: 'Review confirmed',
    text: 'Your review for "Community Cleanup" has been confirmed.',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    meta: { reviewId: 'review-1' },
  },
  {
    id: '4',
    type: 'review_canceling',
    title: 'Review cancelled',
    text: 'The review for "Food Bank Volunteer" has been cancelled.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    meta: { reviewId: 'review-2' },
  },
  {
    id: '5',
    type: 'private',
    title: 'Private message',
    text: 'You have a new private notification from the DoGood team.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '6',
    type: 'info',
    title: 'Platform update',
    text: 'DoGood has been updated with new features. Check them out!',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

interface NotificationStore {
  isOpen: boolean;
  activeTab: 'all' | 'unread';
  notifications: Notification[];
  selectedNotification: Notification | null;

  open: () => void;
  close: () => void;
  toggle: () => void;
  setTab: (tab: 'all' | 'unread') => void;
  selectNotification: (notification: Notification) => void;
  closeModal: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  isOpen: false,
  activeTab: 'all',
  notifications: MOCK_NOTIFICATIONS,
  selectedNotification: null,

  open: (): void => set({ isOpen: true }),
  close: (): void => set({ isOpen: false }),
  toggle: (): void => set((state) => ({ isOpen: !state.isOpen })),
  setTab: (tab): void => set({ activeTab: tab }),
  selectNotification: (notification): void =>
    set({ selectedNotification: notification, isOpen: false }),
  closeModal: (): void => set({ selectedNotification: null }),

  markAsRead: (id): void =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      selectedNotification:
        state.selectedNotification?.id === id
          ? { ...state.selectedNotification, isRead: true }
          : state.selectedNotification,
    })),

  markAllAsRead: (): void =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  deleteNotification: (id): void =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      selectedNotification:
        state.selectedNotification?.id === id
          ? null
          : state.selectedNotification,
    })),
}));
