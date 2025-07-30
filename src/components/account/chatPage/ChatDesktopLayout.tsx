import { ChatCardsList } from '@/components';
import { ChatSearchInput } from '@/components';
import { ChatMessageList } from '@/components';
import { ChatMessageInput } from '@/components';
import { ChatType, MessageType } from '@/types/chatType';

interface ChatDesktopLayoutProps {
  chats: ChatType[];
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  messages: MessageType[];
  onSend: (message: string) => void;
  onChatDeleted: (chatId: string) => void;
  selectedChat: ChatType | null;
}

export const ChatDesktopLayout: React.FC<ChatDesktopLayoutProps> = ({
  chats,
  selectedChatId,
  setSelectedChatId,
  messages,
  onSend,
  onChatDeleted,
  selectedChat,
}) => {
  return (
    <div className="flex h-full gap-9">
      <div className="w-[320px] flex flex-col bg-background text-foreground overflow-y-auto custom-scrollbar-hide">
        <ChatCardsList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          onChatDeleted={onChatDeleted}
        />
      </div>

      <div className="w-[704px] flex-1 flex flex-col text-foreground rounded-sm p-2 lg:bg-[#CFCFCF] dark:bg-[#5D5A5A] lg:p-6">
        {selectedChatId && (
          <>
            <ChatSearchInput
              selectedName={selectedChat?.name || ''}
              lastMessageTime={selectedChat?.createdAt || ''}
              lastOnline={selectedChat?.createdAt || ''}
              showBackButton={false}
              onBack={() => setSelectedChatId(null)}
              onSearch={(query) => console.log('Шукати:', query)}
            />
            <div className="border border-foreground mt-5 mb-12" />
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
