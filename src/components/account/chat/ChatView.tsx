'use client';

import { MessageType } from '@/types/chatType';
import { ChatCardsList } from './ChatCard/ChatCardsList';
import { ChatMessageList } from './ChatMessage/ChatMessagesList';
import { useState } from 'react';

export const ChatView: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const [messages] = useState<MessageType[]>([
    {
      id: 'm1',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Привіт, як справи?',
      createdAt: '2025-07-17T10:00:00Z',
      chatId: '1',
    },
    {
      id: 'm2',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Йдемо сьогодні гуляти?',
      createdAt: '2025-07-17T10:05:00Z',
      chatId: '1',
    },
    {
      id: 'm3',
      senderNickname: 'Oksana',
      senderAvatarUrl: '/avatars/oksana.png',
      text: 'Все добре, дякую!',
      createdAt: '2025-07-17T10:06:00Z',
      chatId: '2',
    },
  ]);

  const filteredMessages = selectedChatId
    ? messages.filter((msg) => msg.chatId === selectedChatId)
    : [];
  return (
    <div className="relative">
      <ChatCardsList
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />
      <ChatMessageList messages={filteredMessages} />
    </div>
  );
};
