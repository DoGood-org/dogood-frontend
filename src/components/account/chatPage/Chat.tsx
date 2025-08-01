'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '@/components';
import { Section } from '@/components/ui/Section';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { ChatType, MessageType } from '@/types/chatType';
import mocks from './mocks.json';

import { ChatMobileLayout } from './ChatMobileLayout';
import { ChatDesktopLayout } from './ChatDesktopLayout';

export const Chat: React.FC = () => {
  const { chats: initialChats, messages: initialMessages } = mocks;
  const [chats, setChats] = useState<ChatType[]>(initialChats);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const isMobileOrTablet = useMediaQuery('(max-width: 1439px)');

  const setIsChatMessageOpen = navigationStore(
    (state) => state.setIsChatMessageOpen
  );

  useEffect(() => {
    const lastChatId = localStorage.getItem('lastChatId');
    if (lastChatId && chats.some((chat) => chat.id === lastChatId)) {
      setSelectedChatId(lastChatId);
    } else if (chats.length > 0) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats]);

  useEffect(() => {
    if (selectedChatId) {
      localStorage.setItem('lastChatId', selectedChatId);
    }
  }, [selectedChatId]);

  const handleChatDeleted = (chatId: string): void => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.roomId !== chatId)
    );
    if (selectedChatId === chatId) {
      setSelectedChatId(null);
    }
  };

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
  }, [selectedChatId, messages]);

  useEffect(() => {
    setIsChatMessageOpen(!!selectedChatId);
  }, [selectedChatId, setIsChatMessageOpen]);

  const userName = 'Name';
  const userAvatar = '/default-avatar.png';

  const handleSend = async (message: string): Promise<void> => {
    if (!selectedChatId || !message.trim()) return;

    const newMessage: MessageType = {
      id: (messages.length + 1).toString(),
      name: userName,
      avatar: userAvatar,
      content: message.trim(),
      createdAt: new Date().toISOString(),
      roomId: selectedChatId,
      senderId: userId,
      isCurrentUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <Section withContainer={false}>
      <div className="lg:-mx-20 lg:justify-start">
        <div className="bg-background text-foreground lg:flex lg:px-20 lg:min-h-0">
          {chats.length === 0 ? (
            <EmptyState />
          ) : isMobileOrTablet ? (
            <ChatMobileLayout
              chats={chats}
              selectedChatId={selectedChatId}
              setSelectedChatId={setSelectedChatId}
              messages={preparedMessages}
              onSend={handleSend}
              onChatDeleted={handleChatDeleted}
              selectedChat={selectedChat || null}
            />
          ) : (
            <ChatDesktopLayout
              chats={chats}
              selectedChatId={selectedChatId}
              setSelectedChatId={setSelectedChatId}
              messages={preparedMessages}
              onSend={handleSend}
              onChatDeleted={handleChatDeleted}
              selectedChat={selectedChat || null}
            />
          )}
        </div>
      </div>
    </Section>
  );
};
