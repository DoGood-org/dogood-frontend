'use client';

import { ChatType } from '@/types/chatType';
import { AdminChatModal } from './AdminChatModal';
import { MoreMenu } from '@/components/ui/MoreMenu';

type Props = {
  chat: ChatType;
  onChatDeleted: (chatId: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
};

export const AdminEllipsisMenu: React.FC<Props> = ({
  chat,
  onChatDeleted,
  onPinToggle,
}) => {
  return (
    <MoreMenu
      items={[
        {
          id: 'admin-modal-content',
          content: (close) => (
            <AdminChatModal
              chat={chat}
              onClose={close}
              onChatDeleted={onChatDeleted}
              onPinToggle={onPinToggle}
            />
          ),
        },
      ]}
    />
  );
};
