'use client';

import { useDeviceType } from '@/hooks/useDeviceType';
import { useEffect, useMemo, useState } from 'react';
import { ChatCardsList, EmptyState } from '@/components';
import { ChatMessageList } from '@/components';
import { ChatSearchInput } from '@/components';
import { Section } from '@/components/ui/Section';
import { ChatMessageInput } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { ChatType, MessageType } from '@/types/chatType';

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

export const mockMessages = [
  {
    id: 'm1',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Привіт, як справи?',
    createdAt: '2025-07-17T09:00:00Z',
    roomId: '1',
    isCurrentUser: true,
  },
  {
    id: 'm2',
    senderId: 2,
    name: 'Oksana',
    avatar: '/avatars/oksana.png',
    content: 'Все добре, дякую!',
    createdAt: '2025-07-17T09:05:00Z',
    roomId: '1',
    isCurrentUser: false,
  },
  {
    id: 'm9',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Чи можеш сьогодні поговорити?',
    createdAt: '2025-07-17T09:10:00Z',
    roomId: '1',
    isCurrentUser: true,
  },
  {
    id: 'm10',
    senderId: 2,
    name: 'Oksana',
    avatar: '/avatars/oksana.png',
    content: 'Так, після обіду буде час.',
    createdAt: '2025-07-17T09:15:00Z',
    roomId: '1',
    isCurrentUser: false,
  },
  {
    id: 'm11',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Супер, тоді на 15:00?',
    createdAt: '2025-07-17T09:20:00Z',
    roomId: '1',
    isCurrentUser: true,
  },
  {
    id: 'm12',
    senderId: 2,
    name: 'Oksana',
    avatar: '/avatars/oksana.png',
    content: 'Підходить!',
    createdAt: '2025-07-17T09:25:00Z',
    roomId: '1',
    isCurrentUser: false,
  },
  // Chat 2
  {
    id: 'm3',
    senderId: 2,
    name: 'Oksana',
    avatar: '/avatars/oksana.png',
    content: 'Привіт, завтра зустрічаємось?',
    createdAt: '2025-07-16T14:00:00Z',
    roomId: '2',
    isCurrentUser: false,
  },
  {
    id: 'm4',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Так, об 11:00 буде зручно.',
    createdAt: '2025-07-16T14:02:00Z',
    roomId: '2',
    isCurrentUser: true,
  },
  {
    id: 'm13',
    senderId: 2,
    name: 'Oksana',
    avatar: '/avatars/oksana.png',
    content: 'Чудово, тоді до зустрічі!',
    createdAt: '2025-07-16T14:05:00Z',
    roomId: '2',
    isCurrentUser: false,
  },
  {
    id: 'm14',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'До зустрічі!',
    createdAt: '2025-07-16T14:10:00Z',
    roomId: '2',
    isCurrentUser: true,
  },
  {
    id: 'm15',
    senderId: 2,
    name: 'Oksana',
    avatar: '/avatars/oksana.png',
    content: 'Я візьму документи.',
    createdAt: '2025-07-16T14:15:00Z',
    roomId: '2',
    isCurrentUser: false,
  },
  {
    id: 'm16',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Окей, дякую!',
    createdAt: '2025-07-16T14:20:00Z',
    roomId: '2',
    isCurrentUser: true,
  },
  // Chat 3
  {
    id: 'm5',
    senderId: 3,
    name: 'Andrii',
    avatar: '/avatars/andrii.png',
    content: 'Є питання по проекту.',
    createdAt: '2025-07-15T12:00:00Z',
    roomId: '3',
    isCurrentUser: false,
  },
  {
    id: 'm6',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Я слухаю.',
    createdAt: '2025-07-15T12:05:00Z',
    roomId: '3',
    isCurrentUser: true,
  },
  {
    id: 'm17',
    senderId: 3,
    name: 'Andrii',
    avatar: '/avatars/andrii.png',
    content: 'Потрібно обговорити дедлайни.',
    createdAt: '2025-07-15T12:10:00Z',
    roomId: '3',
    isCurrentUser: false,
  },
  {
    id: 'm18',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Добре, сьогодні о 17:00 зручно?',
    createdAt: '2025-07-15T12:15:00Z',
    roomId: '3',
    isCurrentUser: true,
  },
  {
    id: 'm19',
    senderId: 3,
    name: 'Andrii',
    avatar: '/avatars/andrii.png',
    content: 'Так, підходить.',
    createdAt: '2025-07-15T12:20:00Z',
    roomId: '3',
    isCurrentUser: false,
  },
  {
    id: 'm20',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Тоді домовились!',
    createdAt: '2025-07-15T12:25:00Z',
    roomId: '3',
    isCurrentUser: true,
  },
  // Chat 4
  {
    id: 'm7',
    senderId: 4,
    name: 'Maria',
    avatar: '/avatars/maria.png',
    content: 'Відправила документи для перевірки.',
    createdAt: '2025-07-14T16:00:00Z',
    roomId: '4',
    isCurrentUser: false,
  },
  {
    id: 'm8',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Отримав, дякую!',
    createdAt: '2025-07-14T16:10:00Z',
    roomId: '4',
    isCurrentUser: true,
  },
  {
    id: 'm21',
    senderId: 4,
    name: 'Maria',
    avatar: '/avatars/maria.png',
    content: 'Якщо щось буде потрібно, дай знати.',
    createdAt: '2025-07-14T16:15:00Z',
    roomId: '4',
    isCurrentUser: false,
  },
  {
    id: 'm22',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Добре, перевірю сьогодні.',
    createdAt: '2025-07-14T16:20:00Z',
    roomId: '4',
    isCurrentUser: true,
  },
  {
    id: 'm23',
    senderId: 4,
    name: 'Maria',
    avatar: '/avatars/maria.png',
    content: 'Чекаю на фідбек.',
    createdAt: '2025-07-14T16:25:00Z',
    roomId: '4',
    isCurrentUser: false,
  },
  {
    id: 'm24',
    senderId: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
    content: 'Дякую, дам відповідь завтра.',
    createdAt: '2025-07-14T16:30:00Z',
    roomId: '4',
    isCurrentUser: true,
  },
];

export const Chat: React.FC = () => {
  const [chats, setChats] = useState<ChatType[]>(mockChats);
  const initialMessages: MessageType[] = mockMessages;
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleChatDeleted = (chatId: string): void => {
    setChats((prevChats) => {
      const updatedChats = prevChats.filter((chat) => chat.id !== chatId);
      return updatedChats;
    });

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (msg) => msg.roomId !== chatId
      );
      return updatedMessages;
    });

    if (selectedChatId === chatId) {
      setSelectedChatId(null);
    }
  };

  const device = useDeviceType();

  const setIsChatMessageOpen = navigationStore(
    (state) => state.setIsChatMessageOpen
  );

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const userId = 1;

  const preparedMessages = useMemo(() => {
    if (!selectedChatId) return [];
    return messages
      .filter((msg) => msg.roomId === selectedChatId)
      .map((msg) => ({
        ...msg,
        isCurrentUser: msg.senderId === userId,
      }));
  }, [selectedChatId, messages, userId]);

  const isMobileOrTablet = device === 'sm' || device === 'md';

  useEffect(() => {
    setIsChatMessageOpen(!!selectedChatId);
  }, [selectedChatId, setIsChatMessageOpen]);

  const handleSend = async (message: string): Promise<void> => {
    if (!selectedChatId || !message.trim()) return;
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
      <div className="bg-background h-[80vh] text-foreground lg:flex lg:gap-9 lg:px-20 lg:min-h-0">
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
                <ChatMessageList messages={preparedMessages} />
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
                onChatDeleted={handleChatDeleted}
              />
            </div>
          )
        ) : (
          // Desktop
          <div className="flex h-full gap-9">
            <div className="w-[320px] flex flex-col bg-background text-foreground overflow-y-auto custom-scrollbar-hide">
              <ChatCardsList
                chats={chats}
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
                onChatDeleted={handleChatDeleted}
              />
            </div>

            <div className="w-[704px] flex-1 flex flex-col text-foreground rounded-sm p-2 lg:bg-[#CFCFCF] dark:bg-[#393939] lg:p-6">
              {selectedChatId ? (
                <ChatSearchInput
                  selectedName={selectedChat?.name || ''}
                  lastMessageTime={selectedChat?.createdAt || ''}
                  lastOnline={selectedChat?.createdAt || ''}
                  showBackButton={false}
                  onBack={() => setSelectedChatId(null)}
                  onSearch={(query) => console.log('Шукати:', query)}
                />
              ) : null}

              <div className="border border-foreground mt-5 mb-12"></div>

              <div className="flex-1 overflow-y-auto custom-scrollbar-hide mt-2 min-h-0">
                {selectedChatId ? (
                  <ChatMessageList messages={preparedMessages} />
                ) : (
                  <EmptyState />
                )}
              </div>

              <div className="mt-6">
                {selectedChatId && <ChatMessageInput onSend={handleSend} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};
