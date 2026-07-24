'use client';

import { useEffect, useState } from 'react';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { MessageType } from '@/types/chatType';
import mocks from './mocks.json';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useChats } from '@/hooks/useChats';
import { useChatMessages } from '@/hooks/useChatMessages';

import { Section } from '@/components/ui/Section';
import { ChatMobileLayout } from './ChatMobileLayout';
import { ChatDesktopLayout } from './ChatDesktopLayout';
import { EmptyState } from './EmptyState';

export const Chat: React.FC = () => {
  const { chats: initialChats, messages: initialMessages } = mocks;

  const isMobileOrTablet = useMediaQuery('(max-width: 1439px)');

  const setIsChatMessageOpen = navigationStore(
    (state) => state.setIsChatMessageOpen
  );

  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const currentUser = {
    id: 1,
    name: 'Ivan',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  };

  const messagesWithReadStatus: MessageType[] = initialMessages.map(
    (message) => ({
      ...message,
      isRead: false,
    })
  );

  const {
    chats,
    selectedChatId,
    setSelectedChatId,
    handleChatDeleted,
    handlePinToggle,
  } = useChats(initialChats, messagesWithReadStatus, isMobileOrTablet);

  const { preparedMessages, addMessage } = useChatMessages(
    messagesWithReadStatus,
    selectedChatId,
    currentUser.id
  );

  useEffect(() => {
    setIsChatMessageOpen(!!selectedChatId);
  }, [selectedChatId, setIsChatMessageOpen]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null;

  const unreadChats = chats.filter((chat) => (chat.unreadCount ?? 0) > 0);

  const filteredChats = activeTab === 'unread' ? unreadChats : chats;

  const handleSend = async (message: string): Promise<void> => {
    if (!selectedChatId || !message.trim()) return;

    const newMessage: MessageType = {
      id: Date.now().toString(),
      name: currentUser.name,
      avatar: currentUser.avatar,
      content: message.trim(),
      createdAt: new Date().toISOString(),
      roomId: selectedChatId,
      senderId: currentUser.id,
      isCurrentUser: true,
      isRead: true,
    };

    addMessage(newMessage);
  };

  return (
    <Section withContainer={false} className="pt-9 md:pt-15 lg:pt-20">
      <div className="bg-background flex justify-center text-foreground lg:min-h-0">
        {chats.length === 0 ? (
          <EmptyState />
        ) : isMobileOrTablet ? (
          <ChatMobileLayout
            chats={filteredChats}
            unreadCount={unreadChats.length}
            activeTab={activeTab}
            onTabChange={setActiveTab}
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
            chats={filteredChats}
            unreadCount={unreadChats.length}
            activeTab={activeTab}
            onTabChange={setActiveTab}
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
