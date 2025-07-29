'use client';

import { MessagesListProps } from '@/types/chatType';
import { ChatMessageItem } from './ChatMessageItem';
import { useEffect, useState } from 'react';
import { EmptyChatMessage } from '../EmptyChatMessage';

export const ChatMessageList: React.FC<MessagesListProps> = ({ messages }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
