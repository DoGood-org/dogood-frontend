import { ChatType, MessageType } from '@/types/chatType';
import { getLastMessageTime } from '@/utils/chatDateUtils';
import { ChatCardsList } from '@/components/account/chatPage/ChatCard/ChatCardsList';
import { ChatSearchInput } from '@/components/account/chatPage/ChatSearchInput';
import { ChatMessageList } from '@/components/account/chatPage/ChatMessage/ChatMessagesList';
import { ChatMessageInput } from '@/components/account/chatPage/ChatMessageInput';

interface ChatDesktopLayoutProps {
  chats: ChatType[];
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  messages: MessageType[];
  onSend: (message: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
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
  onPinToggle,
}) => {
  const lastMessageTime = selectedChatId
    ? getLastMessageTime(messages, selectedChatId)
    : null;

  return (
    <div className="flex h-[856px] max-h-screen min-h-[600px] gap-9">
      <div className="w-[320px] flex flex-col bg-background text-foreground overflow-y-auto custom-scrollbar-hide">
        <ChatCardsList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          onChatDeleted={onChatDeleted}
          onPinToggle={onPinToggle}
        />
      </div>

      <div className="w-[704px] h-full flex-1 flex flex-col text-foreground rounded-sm p-2 lg:bg-[#CFCFCF] dark:bg-[#5D5A5A] lg:p-6">
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
