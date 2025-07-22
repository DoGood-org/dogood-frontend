'use client';

import { useDeviceType } from '@/hooks/useDeviceType';
import { ChatCardViewModel, MessageViewModel } from '@/types/viewModels';
import { useEffect, useState } from 'react';
import { ChatCardsList } from '@/components/account/chatPage/ChatCard/ChatCardsList';
import { ChatMessageList } from './ChatMessage/ChatMessagesList';
import { ChatSearchInput } from './ChatSearchInput';
import { Section } from '@/components/ui/Section';
import { ChatMessageInput } from './ChatMessageInput';

export const Chat: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const device = useDeviceType();

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
      userNickname: 'Andriy',
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
    // Chat 1: Ivan
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
      id: 'm9',
      chatId: '1',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Чи можеш сьогодні поговорити?',
      createdAt: '2025-07-17T09:10:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm10',
      chatId: '1',
      senderNickname: 'Oksana',
      senderAvatarUrl: '/avatars/oksana.png',
      text: 'Так, після обіду буде час.',
      createdAt: '2025-07-17T09:15:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm11',
      chatId: '1',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Супер, тоді на 15:00?',
      createdAt: '2025-07-17T09:20:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm12',
      chatId: '1',
      senderNickname: 'Oksana',
      senderAvatarUrl: '/avatars/oksana.png',
      text: 'Підходить!',
      createdAt: '2025-07-17T09:25:00Z',
      isCurrentUser: false,
    },

    // Chat 2: Oksana
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
      id: 'm13',
      chatId: '2',
      senderNickname: 'Oksana',
      senderAvatarUrl: '/avatars/oksana.png',
      text: 'Чудово, тоді до зустрічі!',
      createdAt: '2025-07-16T14:05:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm14',
      chatId: '2',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'До зустрічі!',
      createdAt: '2025-07-16T14:10:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm15',
      chatId: '2',
      senderNickname: 'Oksana',
      senderAvatarUrl: '/avatars/oksana.png',
      text: 'Я візьму документи.',
      createdAt: '2025-07-16T14:15:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm16',
      chatId: '2',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Окей, дякую!',
      createdAt: '2025-07-16T14:20:00Z',
      isCurrentUser: false,
    },

    // Chat 3: Andrii
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
      id: 'm17',
      chatId: '3',
      senderNickname: 'Andrii',
      senderAvatarUrl: '/avatars/andrii.png',
      text: 'Потрібно обговорити дедлайни.',
      createdAt: '2025-07-15T12:10:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm18',
      chatId: '3',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Добре, сьогодні о 17:00 зручно?',
      createdAt: '2025-07-15T12:15:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm19',
      chatId: '3',
      senderNickname: 'Andrii',
      senderAvatarUrl: '/avatars/andrii.png',
      text: 'Так, підходить.',
      createdAt: '2025-07-15T12:20:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm20',
      chatId: '3',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Тоді домовились!',
      createdAt: '2025-07-15T12:25:00Z',
      isCurrentUser: false,
    },

    // Chat 4: Maria
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
    {
      id: 'm21',
      chatId: '4',
      senderNickname: 'Maria',
      senderAvatarUrl: '/avatars/maria.png',
      text: 'Якщо щось буде потрібно, дай знати.',
      createdAt: '2025-07-14T16:15:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm22',
      chatId: '4',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Добре, перевірю сьогодні.',
      createdAt: '2025-07-14T16:20:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm23',
      chatId: '4',
      senderNickname: 'Maria',
      senderAvatarUrl: '/avatars/maria.png',
      text: 'Чекаю на фідбек.',
      createdAt: '2025-07-14T16:25:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm24',
      chatId: '4',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Дякую, дам відповідь завтра.',
      createdAt: '2025-07-14T16:30:00Z',
      isCurrentUser: false,
    },
    {
      id: 'm25',
      chatId: '4',
      senderNickname: 'Maria',
      senderAvatarUrl: '/avatars/maria.png',
      text: 'Чекаю на фідбек.',
      createdAt: '2025-07-14T16:25:00Z',
      isCurrentUser: true,
    },
    {
      id: 'm26',
      chatId: '4',
      senderNickname: 'Ivan',
      senderAvatarUrl: '/avatars/ivan.png',
      text: 'Дякую, дам відповідь завтра.',
      createdAt: '2025-07-14T16:30:00Z',
      isCurrentUser: false,
    },
  ];

  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId);

  const filteredMessages = selectedChatId
    ? mockMessages.filter((msg) => msg.chatId === selectedChatId)
    : [];

  const isMobileOrTablet = device === 'sm' || device === 'md';

  useEffect(() => {
    if (!isMobileOrTablet && !selectedChatId && mockChats.length > 0) {
      setSelectedChatId(mockChats[0].id);
    }
  }, [isMobileOrTablet, selectedChatId, mockChats]);

  const handleSend = (message: string): void => {
    console.log('Відправлене повідомлення:', message);
  };

  return (
    <Section withContainer={false}>
      <div className="bg-background h-screen text-foreground lg:flex lg:gap-[38px] lg:px-20">
        {isMobileOrTablet ? (
          selectedChatId ? (
            <div className="flex flex-col justify-center bg-text-gray h-screen md:bg-[#CFCFCF] dark:bg-[#393939] py-6 px-2 min-h-0">
              <ChatSearchInput
                selectedName={selectedChat ? selectedChat.userNickname : ''}
                lastMessageTime={
                  selectedChat ? selectedChat.lastMessageDate : ''
                }
                lastOnline={selectedChat ? selectedChat.lastMessageDate : ''}
                showBackButton={isMobileOrTablet}
                onBack={() => setSelectedChatId(null)}
                onSearch={(query) => {
                  console.log('Шукати:', query);
                }}
              />
              <div className="border border-foreground mt-5 lg:border-none lg:mt-0 mb-12"></div>
              <div className="flex-1 overflow-y-auto custom-scrollbar-hide min-h-0 mt-2">
                <ChatMessageList messages={filteredMessages} />
              </div>
              <div className="mt-6">
                <ChatMessageInput onSend={handleSend} />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-1 flex-col overflow-y-auto custom-scrollbar-hide min-h-0">
              <ChatCardsList
                chats={mockChats}
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
              />
            </div>
          )
        ) : (
          // Desktop
          <>
            <div className="w-1/3 flex flex-col bg-background text-foreground flex-1 overflow-y-auto custom-scrollbar-hide">
              <ChatCardsList
                chats={mockChats}
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
              />
            </div>
            <div className="w-2/3 flex flex-col text-foreground rounded-sm p-2 lg:bg-[#CFCFCF] dark:bg-[#393939] lg:p-6">
              <ChatSearchInput
                selectedName={selectedChat ? selectedChat.userNickname : ''}
                lastMessageTime={
                  selectedChat ? selectedChat.lastMessageDate : ''
                }
                lastOnline={selectedChat ? selectedChat.lastMessageDate : ''}
                showBackButton={false}
                onBack={() => setSelectedChatId(null)}
                onSearch={(query) => {
                  console.log('Шукати:', query);
                }}
              />
              <div className="border border-foreground mt-5 mb-12"></div>
              <div className="flex-1 overflow-y-auto custom-scrollbar-hide mt-2">
                <ChatMessageList messages={filteredMessages} />
              </div>
              <div className="mt-6">
                <ChatMessageInput onSend={handleSend} />
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
};
