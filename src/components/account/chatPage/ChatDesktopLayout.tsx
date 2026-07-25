import { ChatType, MessageType } from '@/types/chatType';
import { getLastMessageTime } from '@/utils/chatDateUtils';
import { ChatCardsList } from '@/components/account/chatPage/ChatCard/ChatCardsList';
import { ChatSearchInput } from '@/components/account/chatPage/ChatSearchInput';
import { ChatMessageList } from '@/components/account/chatPage/ChatMessage/ChatMessagesList';
import { ChatMessageInput } from '@/components/account/chatPage/ChatMessageInput';
import ChatTabs from './ChatTabs';
import { ChatListSearch } from './ChatListSearch';
import { useState } from 'react';

interface ChatDesktopLayoutProps {
  chats: ChatType[];
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  messages: MessageType[];
  onSend: (message: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
  onChatDeleted: (chatId: string) => void;
  selectedChat: ChatType | null;
  activeTab: 'all' | 'unread';
  unreadCount: number;
  onTabChange: (tab: 'all' | 'unread') => void;
}

export const ChatDesktopLayout: React.FC<ChatDesktopLayoutProps> = ({
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
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const lastMessageTime = selectedChatId
    ? getLastMessageTime(messages, selectedChatId)
    : null;

  const filteredChats = chats.filter((chat) => {
    const query = searchQuery.toLowerCase();

    return chat.name.toLowerCase().startsWith(query);
  });

  return (
    <div className="flex min-h-[856px] max-h-screen gap-2">
      <div className="bg-admin-background min-w-[354px] w-full flex justify-center pt-2 rounded-xl">
        <div className="w-[320px] flex flex-col text-foreground overflow-y-auto custom-scrollbar-hide">
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
          />
        </div>
      </div>

      <div className="bg-admin-background h-full flex-1 flex flex-col text-foreground rounded-lg p-2 md:min-w-[608px] lg:p-6">
        {selectedChatId && (
          <>
            <ChatSearchInput
              selectedName={selectedChat?.name || ''}
              lastMessageTime={lastMessageTime}
              lastOnline={selectedChat?.createdAt || ''}
              showBackButton={false}
              onBack={() => setSelectedChatId(null)}
              onSearch={(query) => console.log('Шукати:', query)}
            />
            <div className="border border-foreground mt-4" />
          </>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar-hide mt-2 min-h-0">
          <ChatMessageList messages={messages} />
        </div>

        {selectedChatId && (
          <div className="mt-6">
            <ChatMessageInput onSend={onSend} />
          </div>
        )}
      </div>
    </div>
  );
};
