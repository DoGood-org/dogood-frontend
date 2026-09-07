import { create } from 'zustand';
import { Notification } from '@/types/notificationType';

interface NotificationStore {
  isOpen: boolean;
  activeTab: 'all' | 'unread';
  notifications: Notification[];
  selectedNotification: Notification | null;

  setNotifications: (notifications: Notification[]) => void;
  appendNotifications: (notifications: Notification[]) => void;
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
  notifications: [],
  selectedNotification: null,

  setNotifications: (notifications): void => set({ notifications }),
  appendNotifications: (newNotifications): void =>
    set((state) => ({
      notifications: [...state.notifications, ...newNotifications],
    })),

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
