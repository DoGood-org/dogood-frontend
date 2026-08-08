'use client';

import { useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useNotificationStore } from '@/zustand/stores/notificationStore';
import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Button } from '@/components/ui/Button';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';
import { NotificationItem } from './NotificationItem';
import { NotificationModal } from './NotificationModal';

export const NotificationSidebar: React.FC = () => {
  const t = useTranslations('notifications');
  const {
    isOpen,
    close,
    activeTab,
    setTab,
    notifications,
    selectedNotification,
  } = useNotificationStore();

  const {
    isLoading,
    isError,
    isFetchingMore,
    hasMore,
    loadMore,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const sidebarRef = useRef<HTMLElement>(null);

  useClickOutside({
    ref: sidebarRef,
    callback: close,
    options: {
      enabled: isOpen && !selectedNotification,
      detectEscapeKey: true,
    },
  });

  const displayed = useMemo(
    () =>
      activeTab === 'unread'
        ? notifications.filter((n) => !n.isRead)
        : [...notifications].sort(
            (a, b) => Number(a.isRead) - Number(b.isRead)
          ),
    [notifications, activeTab]
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9991] bg-black"
            />

            {/* Panel */}
            <motion.aside
              ref={sidebarRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 z-[9992] h-full w-full max-w-[500px] bg-background shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
                <h2 className="text-foreground font-semibold text-lg">
                  {t('sidebar.title')}
                </h2>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      className="text-xs text-text-help"
                      onClick={() => markAllAsRead()}
                    >
                      {t('sidebar.markAllAsRead')}
                    </Button>
                  )}
                  <ModalCloseButton
                    onClick={close}
                    className="relative top-0 right-0"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-3 px-6 pb-4 shrink-0">
                {(['all', 'unread'] as const).map((tab) => (
                  <Button
                    key={tab}
                    onClick={() => setTab(tab)}
                    variant="secondary"
                    className={cn(
                      'rounded-md',
                      activeTab !== tab && 'border-none'
                    )}
                  >
                    {tab === 'all'
                      ? t('sidebar.tabs.all')
                      : unreadCount > 0
                        ? t('sidebar.unreadCount', { count: unreadCount })
                        : t('sidebar.tabs.unread')}
                  </Button>
                ))}
              </div>

              <ul className="flex-1 overflow-y-auto px-4 flex flex-col gap-2 custom-scrollbar">
                {isLoading ? (
                  <li className="flex items-center justify-center h-full text-text-help">
                    <p className="text-sm">{t('sidebar.loading')}</p>
                  </li>
                ) : isError ? (
                  <li className="flex items-center justify-center h-full text-text-help">
                    <p className="text-sm">{t('sidebar.error')}</p>
                  </li>
                ) : displayed.length === 0 ? (
                  <li className="flex flex-col items-center justify-center h-full gap-3 text-text-help py-12">
                    <p className="text-sm">
                      {activeTab === 'unread'
                        ? t('sidebar.empty.unread')
                        : t('sidebar.empty.all')}
                    </p>
                  </li>
                ) : (
                  <>
                    {displayed.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                      />
                    ))}

                    {hasMore && activeTab === 'all' && (
                      <li className="flex justify-center py-3">
                        <Button
                          variant="ghost"
                          className="text-sm text-text-help"
                          onClick={loadMore}
                          disabled={isFetchingMore}
                        >
                          {isFetchingMore
                            ? t('sidebar.loading')
                            : t('sidebar.loadMore')}
                        </Button>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <NotificationModal
        markAsRead={markAsRead}
        deleteNotification={deleteNotification}
      />
    </>
  );
};
