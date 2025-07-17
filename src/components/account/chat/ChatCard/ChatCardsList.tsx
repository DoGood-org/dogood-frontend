'use client';

import { useState } from 'react';
import { ChatCardItem } from './ChatCardItem';

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

export const ChatCardsList: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  return (
    <ul>
      {mockChats.map((chat) => (
        <ChatCardItem
          key={chat.id}
          chat={chat}
          isSelected={selectedChatId === chat.id}
          onSelect={setSelectedChatId}
        />
      ))}
    </ul>
  );
};
