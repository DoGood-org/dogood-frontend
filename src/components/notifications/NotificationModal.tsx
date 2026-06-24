'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useNotificationStore } from '@/zustand/stores/notificationStore';
import { Notification } from '@/types/notificationType';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';
import { Button } from '@/components/ui/Button';

const BoldText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong className="text-foreground font-semibold">{children}</strong>
);

interface NotificationModalContentProps {
  notification: Notification;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

const NotificationModalContent: React.FC<NotificationModalContentProps> = ({
  notification,
  markAsRead,
  deleteNotification,
}) => {
  const t = useTranslations('notifications');
  const { closeModal } = useNotificationStore();
  const router = useRouter();
  const locale = useLocale();

  const handleDelete = (): void => {
    deleteNotification(notification.id);
    closeModal();
  };

  const handleMarkRead = (): void => {
    markAsRead(notification.id);
    closeModal();
  };

  const navigateTo = (path: string): void => {
    router.push(`/${locale}${path}`);
    closeModal();
  };

  const orgName = notification.meta?.organizationName ?? 'Organization';
  const taskName = notification.meta?.taskName ?? 'Task';
  const revieweeName = notification.meta?.revieweeName ?? 'User';
  const senderName = notification.meta?.senderName ?? 'User';
  const reviewId = notification.meta?.reviewId;
  const orgId = notification.meta?.organizationId;
  const taskId = notification.meta?.taskId;

  const boldTag = (chunks: React.ReactNode): React.ReactNode => (
    <BoldText>{chunks}</BoldText>
  );

  const configs: Record<
    Notification['type'],
    { title: string; description: React.ReactNode; actions: React.ReactNode }
  > = {
    join_organization: {
      title: t('modal.types.join_organization.title'),
      description: t.rich('modal.types.join_organization.description', {
        orgName,
        b: boldTag,
      }),
      actions: (
        <>
          {orgId && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigateTo(`/organization/${orgId}`)}
            >
              {t('modal.actions.viewProfile')}
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={handleMarkRead}>
            {t('modal.actions.accept')}
          </Button>
        </>
      ),
    },

    task_completion: {
      title: t('modal.types.task_completion.title'),
      description: t.rich('modal.types.task_completion.description', {
        taskName,
        b: boldTag,
      }),
      actions: (
        <>
          {taskId && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigateTo(`/tasks/${taskId}`)}
            >
              {t('modal.actions.provideFeedback')}
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={handleMarkRead}>
            {t('modal.actions.markAsRead')}
          </Button>
        </>
      ),
    },

    review_confirmation: {
      title: t('modal.types.review_confirmation.title'),
      description: t.rich('modal.types.review_confirmation.description', {
        revieweeName,
        b: boldTag,
      }),
      actions: reviewId ? (
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo(`/reviews/${reviewId}`)}
        >
          {t('modal.actions.viewReviews')}
        </Button>
      ) : (
        <Button variant="primary" size="sm" onClick={handleMarkRead}>
          {t('modal.actions.markAsRead')}
        </Button>
      ),
    },

    review_canceling: {
      title: t('modal.types.review_canceling.title'),
      description: t.rich('modal.types.review_canceling.description', {
        revieweeName,
        b: boldTag,
      }),
      actions: reviewId ? (
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo(`/reviews/${reviewId}`)}
        >
          {t('modal.actions.viewReviews')}
        </Button>
      ) : (
        <Button variant="primary" size="sm" onClick={handleMarkRead}>
          {t('modal.actions.markAsRead')}
        </Button>
      ),
    },

    private: {
      title: t('modal.types.private.title'),
      description: t.rich('modal.types.private.description', {
        senderName,
        b: boldTag,
      }),
      actions: (
        <Button variant="primary" size="sm" onClick={handleMarkRead}>
          {t('modal.actions.markAsRead')}
        </Button>
      ),
    },

    info: {
      title: t('modal.types.info.title'),
      description: notification.text,
      actions: (
        <Button variant="primary" size="sm" onClick={handleMarkRead}>
          {t('modal.actions.markAsRead')}
        </Button>
      ),
    },
  };

  const { title, description, actions } = configs[notification.type];

  return (
    <div className="flex flex-col items-center text-center gap-4 px-6 py-8">
      <ModalCloseButton onClick={closeModal} className="top-4 right-4" />

      <h3 className="text-foreground font-semibold text-xl leading-snug">
        {title}
      </h3>

      <p className="text-foreground/70 text-sm leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap mt-1">
        {actions}
      </div>

      <Button
        onClick={handleDelete}
        variant="ghost"
        className="h-auto p-0 text-sm text-foreground/40 hover:text-foreground mt-1"
      >
        {t('modal.delete')}
      </Button>
    </div>
  );
};

interface NotificationModalProps {
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  markAsRead,
  deleteNotification,
}) => {
  const { selectedNotification, closeModal } = useNotificationStore();

  return (
    <ModalWrapper
      isOpen={!!selectedNotification}
      onClose={closeModal}
      backdropClassName="bg-black/50 z-[9995]"
      wrapperClassName="max-w-[460px]"
    >
      {selectedNotification && (
        <NotificationModalContent
          notification={selectedNotification}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
        />
      )}
    </ModalWrapper>
  );
};
