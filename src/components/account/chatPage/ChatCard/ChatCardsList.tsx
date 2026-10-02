'use client';

import { useRef } from 'react';
import { ChatCardItem } from './ChatCardItem';
import { ChatCardsListProps } from '@/types/chatType';

export const ChatCardsList: React.FC<ChatCardsListProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
  onChatDeleted,
  onPinToggle,
  showEllipsisMenu = true,
  isAdmin = false,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  const handlePinToggle = (chatId: string, pinned: boolean): void => {
    onPinToggle?.(chatId, pinned);
    setTimeout(() => {
      listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    <ul
      ref={listRef}
      className="flex flex-col gap-2 overflow-y-auto custom-scrollbar-hide min-h-0"
    >
      {chats.map((chat) => (
        <ChatCardItem
          key={chat.id}
          chat={chat}
          unreadCount={chat.unreadCount}
          isSelected={selectedChatId === chat.id}
          onSelect={onSelectChat}
          onChatDeleted={onChatDeleted}
          onPinToggle={handlePinToggle}
          showEllipsisMenu={showEllipsisMenu}
          isAdmin={isAdmin}
        />
      ))}
    </ul>
  );
};
