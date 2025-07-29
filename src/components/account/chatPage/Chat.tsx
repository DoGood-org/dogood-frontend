'use client';

import { useDeviceType } from '@/hooks/useDeviceType';
import { useEffect, useMemo, useState } from 'react';
import { ChatCardsList, EmptyState } from '@/components';
import { ChatMessageList } from '@/components';
import { ChatSearchInput } from '@/components';
import { Section } from '@/components/ui/Section';
import { ChatMessageInput } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { ChatType, MessageType } from '@/types/chatType';
import mocks from './mocks.json';

export const Chat: React.FC = () => {
  const { chats: initialChats, messages: initialMessages } = mocks;
  const [chats, setChats] = useState<ChatType[]>(initialChats);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

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
    setChats((prevChats) => {
      const updatedChats = prevChats.filter((chat) => chat.id !== chatId);
      return updatedChats;
    });

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (msg) => msg.roomId !== chatId
      );
      return updatedMessages;
    });

    if (selectedChatId === chatId) {
      setSelectedChatId(null);
    }
  };

  const device = useDeviceType();

  const setIsChatMessageOpen = navigationStore(
    (state) => state.setIsChatMessageOpen
  );

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
  }, [selectedChatId, messages, userId]);

  const isMobileOrTablet = device === 'sm' || device === 'md';

  useEffect(() => {
    setIsChatMessageOpen(!!selectedChatId);
  }, [selectedChatId, setIsChatMessageOpen]);

  const handleSend = async (message: string): Promise<void> => {
    if (!selectedChatId || !message.trim()) return;
  };

  useEffect(() => {
    if (selectedChatId) {
      setIsChatMessageOpen(true);
    } else {
      setIsChatMessageOpen(false);
    }
  }, [selectedChatId, setIsChatMessageOpen]);

  return (
    <Section withContainer={false}>
      <div className="lg:-mx-20 lg:justify-start">
        <div className="bg-background h-[80vh] text-foreground lg:flex lg:px-20 lg:min-h-0">
          {chats.length === 0 ? (
            <EmptyState />
          ) : isMobileOrTablet ? (
            selectedChatId ? (
              <div className="flex flex-col justify-center bg-text-gray h-full md:bg-[#CFCFCF] dark:bg-[#5D5A5A] py-6 px-2 min-h-0">
                <ChatSearchInput
                  selectedName={selectedChat ? selectedChat.name : ''}
                  lastMessageTime={selectedChat ? selectedChat.createdAt : ''}
                  lastOnline={selectedChat ? selectedChat.createdAt : ''}
                  showBackButton={isMobileOrTablet}
                  onBack={() => setSelectedChatId(null)}
                  onSearch={(query) => {
                    console.log('Шукати:', query);
                  }}
                />
                <div className="border border-foreground mt-5 lg:border-none lg:mt-0 mb-12"></div>
                <div className="flex-1 overflow-y-auto custom-scrollbar-hide min-h-0 mt-2">
                  <ChatMessageList messages={preparedMessages} />
                </div>
                <div className="mt-6">
                  <ChatMessageInput onSend={handleSend} />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-1 flex-col overflow-y-auto custom-scrollbar-hide min-h-0">
                <ChatCardsList
                  chats={chats}
                  selectedChatId={selectedChatId}
                  onSelectChat={setSelectedChatId}
                  onChatDeleted={handleChatDeleted}
                />
              </div>
            )
          ) : (
            // Desktop
            <div className="flex h-full gap-9">
              <div className="w-[320px] flex flex-col bg-background text-foreground overflow-y-auto custom-scrollbar-hide">
                <ChatCardsList
                  chats={chats}
                  selectedChatId={selectedChatId}
                  onSelectChat={setSelectedChatId}
                  onChatDeleted={handleChatDeleted}
                />
              </div>

              <div className="w-[704px] flex-1 flex flex-col text-foreground rounded-sm p-2 lg:bg-[#CFCFCF] dark:bg-[#5D5A5A] lg:p-6">
                {selectedChatId ? (
                  <ChatSearchInput
                    selectedName={selectedChat?.name || ''}
                    lastMessageTime={selectedChat?.createdAt || ''}
                    lastOnline={selectedChat?.createdAt || ''}
                    showBackButton={false}
                    onBack={() => setSelectedChatId(null)}
                    onSearch={(query) => console.log('Шукати:', query)}
                  />
                ) : null}

                <div className="border border-foreground mt-5 mb-12"></div>

                <div className="flex-1 overflow-y-auto custom-scrollbar-hide mt-2 min-h-0">
                  <ChatMessageList messages={preparedMessages} />
                </div>

                <div className="mt-6">
                  {selectedChatId && <ChatMessageInput onSend={handleSend} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};
