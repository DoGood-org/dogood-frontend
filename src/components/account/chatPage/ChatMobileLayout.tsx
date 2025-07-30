import React from 'react';
import { ChatCardsList } from '@/components';
import { ChatMessageList } from '@/components';
import { ChatMessageInput } from '@/components';
import { ChatSearchInput } from '@/components';
import { ChatType, MessageType } from '@/types/chatType';

interface ChatMobileLayoutProps {
  chats: ChatType[];
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  messages: MessageType[];
  onSend: (message: string) => void;
  onChatDeleted: (chatId: string) => void;
  selectedChat: ChatType | null;
}

export const ChatMobileLayout: React.FC<ChatMobileLayoutProps> = ({
  chats,
  selectedChatId,
  setSelectedChatId,
  messages,
  onSend,
  onChatDeleted,
  selectedChat,
}) => {
  return selectedChatId ? (
    <div className="flex flex-col w-full h-full">
      <ChatSearchInput
        selectedName={selectedChat?.name || ''}
        lastMessageTime={selectedChat?.createdAt || ''}
        lastOnline={selectedChat?.createdAt || ''}
        showBackButton={true}
        onBack={() => setSelectedChatId(null)}
        onSearch={(query) => console.log('Пошук:', query)}
      />
      <ChatMessageList messages={messages} />
      <ChatMessageInput onSend={onSend} />
    </div>
  ) : (
    <ChatCardsList
      chats={chats}
      selectedChatId={selectedChatId}
      onSelectChat={setSelectedChatId}
      onChatDeleted={onChatDeleted}
    />
  );
};
