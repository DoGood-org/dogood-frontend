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
import { AdminEllipsisMenu } from '@/components/admin/actions/AdminEllipsisMenu';
import { usePinnedChats } from '@/hooks/usePinnedChats';

interface ChatProps {
  className?: string;
  isAdmin?: boolean;
}

export const Chat: React.FC<ChatProps> = ({ className, isAdmin = false }) => {
  const { chats: initialChats, messages: initialMessages } = mocks;

  const isMobileOrTablet = useMediaQuery('(max-width: 1439px)');

  const setIsChatMessageOpen = navigationStore(
    (state) => state.setIsChatMessageOpen
  );

  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [messageSearch, setMessageSearch] = useState('');

  const currentUser = {
    id: 1,
    name: 'Ivan',
    avatar: '/avatars/ivan.png',
  };

  const messagesWithReadStatus: MessageType[] = initialMessages.map(
    (message) => ({
      ...message,

      isRead: false,
    })
  );

  const { chats, selectedChatId, setSelectedChatId, handleChatDeleted } =
    useChats(initialChats, messagesWithReadStatus, isMobileOrTablet, false);

  const { chats: pinnedChats, handlePinToggle } = usePinnedChats(chats);
  const displayChats = isAdmin ? chats : pinnedChats;

  const { preparedMessages, addMessage } = useChatMessages(
    messagesWithReadStatus,
    selectedChatId,
    currentUser.id
  );

  useEffect(() => {
    setIsChatMessageOpen(!!selectedChatId);
  }, [selectedChatId, setIsChatMessageOpen]);

  const selectedChat =
    displayChats.find((chat) => chat.id === selectedChatId) || null;

  const unreadChats = displayChats.filter(
    (chat) => (chat.unreadCount ?? 0) > 0
  );

  const filteredChats = [
    ...(activeTab === 'unread' ? unreadChats : displayChats),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredMessages = preparedMessages.filter((message) =>
    message.content.toLowerCase().includes(messageSearch.toLowerCase())
  );

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
    <Section
      withContainer={false}
      className={className || 'pt-9 md:pt-15 lg:pt-20'}
    >
      <div className="bg-background flex text-foreground">
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
            messages={filteredMessages}
            onMessageSearch={setMessageSearch}
            onSend={handleSend}
            onChatDeleted={handleChatDeleted}
            selectedChat={selectedChat || null}
            onPinToggle={isAdmin ? undefined : handlePinToggle}
            isAdmin={isAdmin}
            showEllipsisMenu={!isAdmin}
            rightElement={
              isAdmin && selectedChat ? <AdminEllipsisMenu /> : undefined
            }
          />
        ) : (
          <ChatDesktopLayout
            chats={filteredChats}
            unreadCount={unreadChats.length}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
            messages={filteredMessages}
            onMessageSearch={setMessageSearch}
            onSend={handleSend}
            onChatDeleted={handleChatDeleted}
            selectedChat={selectedChat || null}
            onPinToggle={isAdmin ? undefined : handlePinToggle}
            showEllipsisMenu={!isAdmin}
            isAdmin={isAdmin}
            rightElement={
              isAdmin && selectedChat ? <AdminEllipsisMenu /> : undefined
            }
          />
        )}
      </div>
    </Section>
  );
};
