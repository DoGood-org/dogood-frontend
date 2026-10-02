'use client';

import { ChatEllipsisMenuProps } from '@/types/chatType';
import { ChatModal } from './ChatModal';
import { MoreMenu } from '@/components/ui/MoreMenu';

export const ChatEllipsisMenu: React.FC<ChatEllipsisMenuProps> = ({
  chat,
  onChatDeleted,
  onPinToggle,
  showPinActions = true,
}) => {
  return (
    <MoreMenu
      items={[
        {
          id: 'chat-menu',
          content: (close) => (
            <ChatModal
              chat={chat}
              onClose={close}
              onChatDeleted={onChatDeleted}
              onPinToggle={onPinToggle}
              showPinActions={showPinActions}
            />
          ),
        },
      ]}
    />
  );
};
