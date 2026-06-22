'use client';

import { Notification } from '@/types/notificationType';
import { useNotificationStore } from '@/zustand/stores/notificationStore';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const { selectNotification, markAsRead } = useNotificationStore();

  const handleClick = (): void => {
    selectNotification(notification);
    if (!notification.isRead) markAsRead(notification.id);
  };

  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });

  return (
    <li
      onClick={handleClick}
      className={cn(
        'flex items-center justify-between gap-3 px-4 py-5 rounded-lg cursor-pointer',
        'hover:brightness-95 transition-[filter] duration-150',
        notification.isRead ? 'bg-foreground/8' : 'bg-card'
      )}
    >
      <div className="min-w-0">
        <p className={cn('font-medium leading-snug truncate text-foreground')}>
          {notification.title}
        </p>
        <p className="text-sm text-text-help mt-0.5">{timeAgo}</p>
      </div>

      <span
        className={cn(
          'shrink-0 size-2.5 rounded-full transition-opacity',
          notification.isRead ? 'opacity-0' : 'bg-btn'
        )}
      />
    </li>
  );
};
