'use client';

import { MessagesListProps } from '@/types/chatType';
import { ChatMessageItem } from './ChatMessageItem';
import { useEffect, useState } from 'react';

export const ChatMessageList: React.FC<MessagesListProps> = ({ messages }) => {
  console.log('messages:', messages);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col flex-grow min-w-0 w-full">
      {messages.length === 0 ? (
        <p className="w-[318px] text-black text-center mt-6 md:w-[608px]">
          Немає повідомлень
        </p>
      ) : (
        <ul className="flex flex-col gap-6 mt-6 w-full max-w-[608px] md:max-w-none">
          {messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}
        </ul>
      )}
    </div>
  );
};
