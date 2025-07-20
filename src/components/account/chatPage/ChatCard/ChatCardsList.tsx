'use client';

import { ChatCardItem } from './ChatCardItem';
import { ChatCardsListProps } from '@/types/chatType';

const mockChats = [
  {
    id: '1',
    userNickname: 'Ivan',
    lastMessageText: 'Привіт, як справи?',
    lastMessageDate: '2025-07-17',
    userAvatarUrl: '/avatars/ivan.png',
  },
  {
    id: '2',
    userNickname: 'Oksana',
    lastMessageText: 'Завтра зустрічаємось?',
    lastMessageDate: '2025-07-16',
    userAvatarUrl: '/avatars/oksana.png',
  },
];

export const ChatCardsList: React.FC<ChatCardsListProps> = ({
  selectedChatId,
  onSelectChat,
}) => {
  return (
    <ul className="flex flex-col gap-4">
      {mockChats.map((chat) => (
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
