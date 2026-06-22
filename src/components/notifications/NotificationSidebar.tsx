'use client';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useNotificationStore } from '@/zustand/stores/notificationStore';
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

  const sidebarRef = useRef<HTMLElement>(null);

  useClickOutside({
    ref: sidebarRef,
    callback: close,
    options: {
      enabled: isOpen && !selectedNotification,
      detectEscapeKey: true,
    },
  });

  const displayed =
    activeTab === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : [...notifications].sort((a, b) => Number(a.isRead) - Number(b.isRead));

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
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
                <ModalCloseButton
                  onClick={close}
                  className="relative top-0 right-0"
                />
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

              {/* List */}
              <ul className="flex-1 overflow-y-auto px-4 flex flex-col gap-2 custom-scrollbar">
                {displayed.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-text-help py-12">
                    <p className="text-sm">
                      {activeTab === 'unread'
                        ? t('sidebar.empty.unread')
                        : t('sidebar.empty.all')}
                    </p>
                  </div>
                ) : (
                  displayed.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                )}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <NotificationModal />
    </>
  );
};
