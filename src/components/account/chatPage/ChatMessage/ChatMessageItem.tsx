'use client';

import { cn } from '@/lib/utils';
import { MessageItemProps } from '@/types/chatType';
import Image from 'next/image';

export const ChatMessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <li
      className={cn(
        'flex items-start gap-3 py-3 px-6 w-[318px] relative rounded-sm md:w-[608px]',
        message.isCurrentUser
          ? 'ml-auto bg-[#3D8940] text-[#010101] dark:text-white'
          : 'mr-auto bg-tag text-white dark:bg-[#DCDCDC] dark:text-[#010101]'
      )}
    >
      <div
        className={cn(
          message.isCurrentUser
            ? 'order-2 flex-shrink-0'
            : 'order-1 flex-shrink-0'
        )}
      >
        <Image
          src={message.avatar}
          alt={message.name}
          width={42}
          height={42}
          className="w-[42px] h-[42px] rounded-full object-cover bg-white shrink-0"
        />
      </div>
      <div
        className={cn(
          'flex flex-col justify-between flex-1 max-w-full min-w-0',
          message.isCurrentUser ? 'order-1' : 'order-2'
        )}
      >
        <p className="text-base break-words">{message.content}</p>
        <span className="text-xs self-end mt-2 opacity-70">
          {formatDate(message.createdAt)}
        </span>
      </div>
    </li>
  );
};
