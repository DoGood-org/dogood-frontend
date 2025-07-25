'use client';

import { ChatCardItem } from './ChatCardItem';
import { ChatCardsListProps } from '@/types/chatType';

export const ChatCardsList: React.FC<ChatCardsListProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
}) => {
  return (
    <ul className="flex flex-col gap-6 md:gap4">
      {chats.map((chat) => (
        <ChatCardItem
          key={chat.id}
          chat={chat}
          isSelected={selectedChatId === chat.id}
          onSelect={onSelectChat}
        />
      ))}
    </ul>
  );
};
