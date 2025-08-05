'use client';

import { MessagesListProps } from '@/types/chatType';
import { ChatMessageItem } from '@/components';
import { useEffect, useState } from 'react';
import { EmptyChatMessage } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';

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
          <ul className="flex flex-col gap-6 mt-6 w-full">
            {messages.map((message) => (
              <ChatMessageItem key={message.id} message={message} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
