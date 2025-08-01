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
    <div className="flex flex-col h-[1216px] md:h-[856px] max-h-screen md:min-h-[856px] bg-[#CFCFCF] dark:bg-[#5D5A5A] pt-[20px] pb-[24px] pl-[8px] pr-[8px]">
      <ChatSearchInput
        selectedName={selectedChat?.name || ''}
        lastMessageTime={selectedChat?.createdAt || ''}
        lastOnline={selectedChat?.createdAt || ''}
        showBackButton={true}
        onBack={() => setSelectedChatId(null)}
        onSearch={(query) => console.log('Пошук:', query)}
      />
      <div className="border border-foreground mt-5 mb-12" />
      <div className="flex-1 overflow-y-auto custom-scrollbar-hide min-h-0">
        <ChatMessageList messages={messages} />
      </div>
      <ChatMessageInput onSend={onSend} />
    </div>
  ) : (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar-hide min-h-0">
      <ChatCardsList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        onChatDeleted={onChatDeleted}
      />
    </div>
  );
};
