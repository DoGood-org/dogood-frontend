'use client';

import { useNotificationStore } from '@/zustand/stores/notificationStore';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { NotificationModalContent } from './NotificationModalContent';

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
