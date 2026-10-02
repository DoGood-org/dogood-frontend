'use client';

import { useEffect, useState } from 'react';
import { MessagesListProps } from '@/types/chatType';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { EmptyChatMessage } from '@/components/account/chatPage/EmptyChatMessage';
import { ChatMessageItem } from '@/components/account/chatPage/ChatMessage/ChatMessageItem';

export const ChatMessageList: React.FC<MessagesListProps> = ({ messages }) => {
  const [mounted, setMounted] = useState(false);
  const setIsChatMessageOpen = navigationStore(
    (state) => state.setIsChatMessageOpen
  );

  useEffect(() => {
    setMounted(true);

    setIsChatMessageOpen(true);

    return (): void => {
      setIsChatMessageOpen(false);
    };
  }, [setIsChatMessageOpen]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col flex-grow min-w-0 w-full items-center">
      <div className="w-full max-w-[608px] md:max-w-none">
        {messages.length === 0 ? (
          <div className="h-[50vh] flex justify-center items-center">
            <EmptyChatMessage />
          </div>
        ) : (
          <ul className="flex flex-col gap-6 mt-4 w-full">
            {messages.map((message) => (
              <ChatMessageItem key={message.id} message={message} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
