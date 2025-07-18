'use client';

import { ChatCardViewModel, MessageViewModel } from '@/types/viewModels';
import { ChatCardsList } from './ChatCard/ChatCardsList';
import { ChatMessageList } from './ChatMessage/ChatMessagesList';
import { useState } from 'react';
import { ChatSearchInput } from '@/components/account/chat/ChatSearchInput';

type ChatInputProps = {
  selectedName: string;
  lastOnline: string;
  icon?: React.ReactNode;
  className?: string;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const ChatView: React.FC<ChatInputProps> = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const mockChats: ChatCardViewModel[] = [
    {
      id: '1',
      userNickname: 'Ivan',
      lastMessageText: 'Буде час поговорити?',
      lastMessageDate: '2025-07-17',
      userAvatarUrl: '/avatars/ivan.png',
    },
    {
      id: '2',
      userNickname: 'Oksana',
      lastMessageText: 'Коли зустрічаємось?',
      lastMessageDate: '2025-07-16',
      userAvatarUrl: '/avatars/oksana.png',
    },
    {
      id: '3',
      userNickname: 'Andrii',
      lastMessageText: 'Чекаю на відповідь!',
      lastMessageDate: '2025-07-15',
      userAvatarUrl: '/avatars/andrii.png',
    },
    {
      id: '4',
      userNickname: 'Maria',
      lastMessageText: 'Відправила документи',
      lastMessageDate: '2025-07-14',
      userAvatarUrl: '/avatars/maria.png',
    },
  ];

  const mockMessages: MessageViewModel[] = [
    {
      id: 'm1',
      chatId: '1',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Привіт, як справи?',
      createdAt: '2025-07-17T09:00:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm2',
      chatId: '1',
      senderNickname: 'Oksana',
      senderAvatarUrl: '/avatars/oksana.png',
      text: 'Все добре, дякую!',
      createdAt: '2025-07-17T09:05:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm3',
      chatId: '2',
      senderNickname: 'Oksana',
      senderAvatarUrl: '/avatars/oksana.png',
      text: 'Привіт, завтра зустрічаємось?',
      createdAt: '2025-07-16T14:00:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm4',
      chatId: '2',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Так, об 11:00 буде зручно.',
      createdAt: '2025-07-16T14:02:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm5',
      chatId: '3',
      senderNickname: 'Andrii',
      senderAvatarUrl: '/avatars/andrii.png',
      text: 'Є питання по проекту.',
      createdAt: '2025-07-15T12:00:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm6',
      chatId: '3',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Я слухаю.',
      createdAt: '2025-07-15T12:05:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm7',
      chatId: '4',
      senderNickname: 'Maria',
      senderAvatarUrl: '/avatars/maria.png',
      text: 'Відправила документи для перевірки.',
      createdAt: '2025-07-14T16:00:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm8',
      chatId: '4',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Отримав, дякую!',
      createdAt: '2025-07-14T16:10:00Z',
      isCurrentUser: false,
    },
  ];

  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId);

  const filteredMessages = selectedChatId
    ? mockMessages.filter((msg) => msg.chatId === selectedChatId)
    : [];
  return (
    <div className="relative flex">
      <ChatSearchInput
        selectedName={selectedChat ? selectedChat.userNickname : 'Виберіть чат'}
        lastOnline={selectedChat ? selectedChat.lastMessageDate : ''}
      />
      <ChatCardsList
        chats={mockChats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />
      <ChatMessageList messages={filteredMessages} />
    </div>
  );
};
