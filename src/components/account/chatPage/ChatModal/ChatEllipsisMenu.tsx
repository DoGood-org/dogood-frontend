'use client';

import { ChatType } from '@/types/chatType';
import { ChatModal } from './ChatModal';
import { MoreMenu } from '@/components/ui/MoreMenu';

type Props = {
  chat: ChatType;
  onChatDeleted: (chatId: string) => void;
  onPinToggle?: (chatId: string, pinned: boolean) => void;
  showPinActions?: boolean;
};

export const ChatEllipsisMenu: React.FC<Props> = ({
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
