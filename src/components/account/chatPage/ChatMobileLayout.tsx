import React, { useState } from 'react';
import { ChatType, MessageType } from '@/types/chatType';
import { getLastMessageTime } from '@/utils/chatDateUtils';
import { ChatSearchInput } from '@/components/account/chatPage/ChatSearchInput';
import { ChatMessageList } from '@/components/account/chatPage/ChatMessage/ChatMessagesList';
import { ChatMessageInput } from '@/components/account/chatPage/ChatMessageInput';
import { ChatCardsList } from '@/components/account/chatPage/ChatCard/ChatCardsList';
import ChatTabs from './ChatTabs';
import { ChatListSearch } from './ChatListSearch';
import { useFilteredChats } from '@/hooks/useFilteredChats';

interface ChatMobileLayoutProps {
  chats: ChatType[];
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  messages: MessageType[];
  onSend: (message: string) => void;
  onPinToggle?: (chatId: string, pinned: boolean) => void;
  onChatDeleted: (chatId: string) => void;
  selectedChat: ChatType | null;
  activeTab: 'all' | 'unread';
  unreadCount: number;
  onTabChange: (tab: 'all' | 'unread') => void;
  onMessageSearch: (query: string) => void;
  rightElement?: React.ReactNode;
  showEllipsisMenu?: boolean;
  isAdmin?: boolean;
}

export const ChatMobileLayout: React.FC<ChatMobileLayoutProps> = ({
  chats,
  selectedChatId,
  setSelectedChatId,
  messages,
  onSend,
  onChatDeleted,
  selectedChat,
  onPinToggle,
  activeTab,
  unreadCount,
  onTabChange,
  rightElement,
  showEllipsisMenu,
  onMessageSearch,
  isAdmin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const lastMessageTime = selectedChatId
    ? getLastMessageTime(messages, selectedChatId)
    : null;

  const filteredChats = useFilteredChats(chats, searchQuery);

  return selectedChatId ? (
    <div className="flex flex-col rounded-lg p-4 pb-5 bg-admin-background h-[1216px] w-[353px] md:h-[856px] max-h-screen md:w-[648px] lg:w-[608px]">
      <ChatSearchInput
        selectedName={selectedChat?.name || ''}
        lastMessageTime={lastMessageTime}
        lastOnline={selectedChat?.createdAt || ''}
        showBackButton={true}
        onBack={() => setSelectedChatId(null)}
        onSearch={onMessageSearch}
        rightElement={rightElement}
        variant={isAdmin ? 'admin' : 'chat'}
      />
      <div className="border border-foreground mt-4" />
      <div className="flex-1 overflow-y-auto custom-scrollbar-hide min-h-0">
        <ChatMessageList messages={messages} />
      </div>
      <ChatMessageInput onSend={onSend} />
    </div>
  ) : (
    <div className="bg-admin-background w-full h-full max-w-[354px] md:max-w-[648px] min-h-[680px] md:min-h-[856px] flex justify-center py-2 px-4 rounded-xl">
      <div className="flex-1 w-full h-full max-w-[320px] md:max-w-[616px]">
        <ChatListSearch value={searchQuery} onSearch={setSearchQuery} />
        <ChatTabs
          activeTab={activeTab}
          unreadCount={unreadCount}
          onChange={onTabChange}
        />
        <ChatCardsList
          chats={filteredChats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          onChatDeleted={onChatDeleted}
          onPinToggle={onPinToggle}
          showEllipsisMenu={showEllipsisMenu}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};
