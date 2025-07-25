'use client';

import { useDeviceType } from '@/hooks/useDeviceType';
import { useEffect, useState } from 'react';
import { ChatCardsList } from '@/components/account/chatPage/ChatCard/ChatCardsList';
import { ChatMessageList } from './ChatMessage/ChatMessagesList';
import { ChatSearchInput } from './ChatSearchInput';
import { Section } from '@/components/ui/Section';
import { ChatMessageInput } from './ChatMessageInput';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { ChatType, MessageType } from '@/types/chatType';

export const Chat: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const device = useDeviceType();

  const setIsChatMessageOpen = navigationStore(
    (state) => state.setIsChatMessageOpen
  );

  const mockChats: ChatType[] = [
    {
      id: '1',
      name: 'Ivan',
      content: 'Буде час поговорити?',
      createdAt: '2025-07-17',
      avatar: '/avatars/ivan.png',
    },
    {
      id: '2',
      name: 'Oksana',
      content: 'Коли зустрічаємось?',
      createdAt: '2025-07-16',
      avatar: '/avatars/oksana.png',
    },
    {
      id: '3',
      name: 'Andriy',
      content: 'Чекаю на відповідь!',
      createdAt: '2025-07-15',
      avatar: '/avatars/andrii.png',
    },
    {
      id: '4',
      name: 'Maria',
      content: 'Відправила документи',
      createdAt: '2025-07-14',
      avatar: '/avatars/maria.png',
    },
    {
      id: '5',
      name: 'Petro',
      content: 'Привіт, як твої справи?',
      createdAt: '2025-07-13',
      avatar: '/avatars/petro.png',
    },
    {
      id: '6',
      name: 'Sofiia',
      content: 'Я скинула файли.',
      createdAt: '2025-07-12',
      avatar: '/avatars/sofiia.png',
    },
    {
      id: '7',
      name: 'Maksym',
      content: 'Коли зідзвонимось?',
      createdAt: '2025-07-11',
      avatar: '/avatars/maksym.png',
    },
    {
      id: '8',
      name: 'Kateryna',
      content: 'Ок, дякую!',
      createdAt: '2025-07-10',
      avatar: '/avatars/kateryna.png',
    },
    {
      id: '9',
      name: 'Dmytro',
      content: 'Підтверджую зустріч.',
      createdAt: '2025-07-09',
      avatar: '/avatars/dmytro.png',
    },
    {
      id: '10',
      name: 'Olena',
      content: 'Відправила звіт.',
      createdAt: '2025-07-08',
      avatar: '/avatars/olena.png',
    },
    {
      id: '11',
      name: 'Taras',
      content: 'Зустрінемось завтра?',
      createdAt: '2025-07-07',
      avatar: '/avatars/taras.png',
    },
    {
      id: '12',
      name: 'Iryna',
      content: 'Готово!',
      createdAt: '2025-07-06',
      avatar: '/avatars/iryna.png',
    },
    {
      id: '13',
      name: 'Volodymyr',
      content: 'Чекаю на відповідь.',
      createdAt: '2025-07-05',
      avatar: '/avatars/volodymyr.png',
    },
    {
      id: '14',
      name: 'Natalia',
      content: 'Все чудово, дякую.',
      createdAt: '2025-07-04',
      avatar: '/avatars/natalia.png',
    },
  ];

  const mockMessages: MessageType[] = [
    {
      id: 'm1',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Привіт, як справи?',
      createdAt: '2025-07-17T09:00:00Z',
      roomId: '1',
      isCurrentUser: true,
    },
    {
      id: 'm2',
      name: 'Oksana',
      avatar: '/avatars/oksana.png',
      content: 'Все добре, дякую!',
      createdAt: '2025-07-17T09:05:00Z',
      roomId: '1',
      isCurrentUser: false,
    },
    {
      id: 'm9',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Чи можеш сьогодні поговорити?',
      createdAt: '2025-07-17T09:10:00Z',
      roomId: '1',
      isCurrentUser: true,
    },
    {
      id: 'm10',
      name: 'Oksana',
      avatar: '/avatars/oksana.png',
      content: 'Так, після обіду буде час.',
      createdAt: '2025-07-17T09:15:00Z',
      roomId: '1',
      isCurrentUser: false,
    },
    {
      id: 'm11',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Супер, тоді на 15:00?',
      createdAt: '2025-07-17T09:20:00Z',
      roomId: '1',
      isCurrentUser: true,
    },
    {
      id: 'm12',
      name: 'Oksana',
      avatar: '/avatars/oksana.png',
      content: 'Підходить!',
      createdAt: '2025-07-17T09:25:00Z',
      roomId: '1',
      isCurrentUser: false,
    },

    // Chat 2: Oksana
    {
      id: 'm3',
      name: 'Oksana',
      avatar: '/avatars/oksana.png',
      content: 'Привіт, завтра зустрічаємось?',
      createdAt: '2025-07-16T14:00:00Z',
      roomId: '2',
      isCurrentUser: true,
    },
    {
      id: 'm4',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Так, об 11:00 буде зручно.',
      createdAt: '2025-07-16T14:02:00Z',
      roomId: '2',
      isCurrentUser: false,
    },
    {
      id: 'm13',
      name: 'Oksana',
      avatar: '/avatars/oksana.png',
      content: 'Чудово, тоді до зустрічі!',
      createdAt: '2025-07-16T14:05:00Z',
      roomId: '2',
      isCurrentUser: true,
    },
    {
      id: 'm14',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'До зустрічі!',
      createdAt: '2025-07-16T14:10:00Z',
      roomId: '2',
      isCurrentUser: false,
    },
    {
      id: 'm15',
      name: 'Oksana',
      avatar: '/avatars/oksana.png',
      content: 'Я візьму документи.',
      createdAt: '2025-07-16T14:15:00Z',
      roomId: '2',
      isCurrentUser: true,
    },
    {
      id: 'm16',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Окей, дякую!',
      createdAt: '2025-07-16T14:20:00Z',
      roomId: '2',
      isCurrentUser: false,
    },

    // Chat 3: Andrii
    {
      id: 'm5',
      name: 'Andrii',
      avatar: '/avatars/andrii.png',
      content: 'Є питання по проекту.',
      createdAt: '2025-07-15T12:00:00Z',
      roomId: '3',
      isCurrentUser: true,
    },
    {
      id: 'm6',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Я слухаю.',
      createdAt: '2025-07-15T12:05:00Z',
      roomId: '3',
      isCurrentUser: false,
    },
    {
      id: 'm17',
      name: 'Andrii',
      avatar: '/avatars/andrii.png',
      content: 'Потрібно обговорити дедлайни.',
      createdAt: '2025-07-15T12:10:00Z',
      roomId: '3',
      isCurrentUser: true,
    },
    {
      id: 'm18',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Добре, сьогодні о 17:00 зручно?',
      createdAt: '2025-07-15T12:15:00Z',
      roomId: '3',
      isCurrentUser: false,
    },
    {
      id: 'm19',
      name: 'Andrii',
      avatar: '/avatars/andrii.png',
      content: 'Так, підходить.',
      createdAt: '2025-07-15T12:20:00Z',
      roomId: '3',
      isCurrentUser: true,
    },
    {
      id: 'm20',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Тоді домовились!',
      createdAt: '2025-07-15T12:25:00Z',
      roomId: '3',
      isCurrentUser: false,
    },

    // Chat 4: Maria
    {
      id: 'm7',
      name: 'Maria',
      avatar: '/avatars/maria.png',
      content: 'Відправила документи для перевірки.',
      createdAt: '2025-07-14T16:00:00Z',
      roomId: '4',
      isCurrentUser: true,
    },
    {
      id: 'm8',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Отримав, дякую!',
      createdAt: '2025-07-14T16:10:00Z',
      roomId: '4',
      isCurrentUser: false,
    },
    {
      id: 'm21',
      name: 'Maria',
      avatar: '/avatars/maria.png',
      content: 'Якщо щось буде потрібно, дай знати.',
      createdAt: '2025-07-14T16:15:00Z',
      roomId: '4',
      isCurrentUser: true,
    },
    {
      id: 'm22',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Добре, перевірю сьогодні.',
      createdAt: '2025-07-14T16:20:00Z',
      roomId: '4',
      isCurrentUser: false,
    },
    {
      id: 'm23',
      name: 'Maria',
      avatar: '/avatars/maria.png',
      content: 'Чекаю на фідбек.',
      createdAt: '2025-07-14T16:25:00Z',
      roomId: '4',
      isCurrentUser: true,
    },
    {
      id: 'm24',
      name: 'Ivan',
      avatar: '/avatars/ivan.png',
      content: 'Дякую, дам відповідь завтра.',
      createdAt: '2025-07-14T16:30:00Z',
      roomId: '4',
      isCurrentUser: false,
    },
  ];

  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId);

  const filteredMessages = selectedChatId
    ? mockMessages.filter((msg) => msg.roomId === selectedChatId)
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

  useEffect(() => {
    if (selectedChatId) {
      setIsChatMessageOpen(true);
    } else {
      setIsChatMessageOpen(false);
    }
  }, [selectedChatId, setIsChatMessageOpen]);

  return (
    <Section withContainer={false}>
      <div className="bg-background h-screen text-foreground lg:flex lg:gap-[38px] lg:px-20 lg:min-h-0">
        {isMobileOrTablet ? (
          selectedChatId ? (
            <div className="flex flex-col justify-center bg-text-gray h-full md:bg-[#CFCFCF] dark:bg-[#393939] py-6 px-2 min-h-0">
              <ChatSearchInput
                selectedName={selectedChat ? selectedChat.name : ''}
                lastMessageTime={selectedChat ? selectedChat.createdAt : ''}
                lastOnline={selectedChat ? selectedChat.createdAt : ''}
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
            <div className="w-full h-full flex flex-1 flex-col overflow-y-auto custom-scrollbar-hide min-h-0">
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
                selectedName={selectedChat ? selectedChat.name : ''}
                lastMessageTime={selectedChat ? selectedChat.createdAt : ''}
                lastOnline={selectedChat ? selectedChat.createdAt : ''}
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
