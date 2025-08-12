'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useEffect } from 'react';
import { EmptyState } from '@/components';
import { Section } from '@/components/ui/Section';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { MessageType } from '@/types/chatType';
import mocks from './mocks.json';

import { ChatMobileLayout } from './ChatMobileLayout';
import { ChatDesktopLayout } from './ChatDesktopLayout';
import { useChats } from '@/hooks/useChats';
import { useChatMessages } from '@/hooks/useChatMessages';

export const Chat: React.FC = () => {
  const { chats: initialChats, messages: initialMessages } = mocks;
  const isMobileOrTablet = useMediaQuery('(max-width: 1439px)');
  const setIsChatMessageOpen = navigationStore(
    (state) => state.setIsChatMessageOpen
  );

  const userId = 1;
  const userName = 'Name';
  const userAvatar = '/default-avatar.png';

  const {
    chats,
    selectedChatId,
    setSelectedChatId,
    handleChatDeleted,
    handlePinToggle,
  } = useChats(initialChats, isMobileOrTablet);

  const { preparedMessages, addMessage } = useChatMessages(
    initialMessages,
    selectedChatId,
    userId
  );

  useEffect(() => {
    setIsChatMessageOpen(!!selectedChatId);
  }, [selectedChatId, setIsChatMessageOpen]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null;

  const handleSend = async (message: string): Promise<void> => {
    if (!selectedChatId || !message.trim()) return;

    const newMessage: MessageType = {
      id: (preparedMessages.length + 1).toString(),
      name: userName,
      avatar: userAvatar,
      content: message.trim(),
      createdAt: new Date().toISOString(),
      roomId: selectedChatId,
      senderId: userId,
      isCurrentUser: true,
    };

    addMessage(newMessage);
  };

  return (
    <Section withContainer={false} className="lg:pt-20 md:pt-20 sm:pt-20">
      <div className="bg-background text-foreground lg:flex lg:min-h-0">
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
            onPinToggle={handlePinToggle}
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
            onPinToggle={handlePinToggle}
          />
        )}
      </div>
    </Section>
  );
};
