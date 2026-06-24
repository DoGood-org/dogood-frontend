'use client';

import { useLocale } from 'next-intl';
import { enUS, de } from 'date-fns/locale';
import { Notification } from '@/types/notificationType';
import { useNotificationStore } from '@/zustand/stores/notificationStore';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const DATE_LOCALES = { en: enUS, de } as const;

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const { selectNotification } = useNotificationStore();
  const locale = useLocale();

  const handleClick = (): void => {
    selectNotification(notification);
    if (!notification.isRead) onMarkAsRead(notification.id);
  };

  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale: DATE_LOCALES[locale as keyof typeof DATE_LOCALES] ?? enUS,
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
