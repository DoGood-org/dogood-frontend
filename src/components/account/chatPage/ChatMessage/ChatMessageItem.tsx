'use client';

import { cn } from '@/lib/utils';
import { MessageItemProps } from '@/types/chatType';
import Image from 'next/image';

export const ChatMessageItem: React.FC<MessageItemProps> = ({ message }) => {
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
          src="/avatars/dmytro.png"
          alt="avatar"
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
          {new Date(message.createdAt).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </span>
      </div>
    </li>
  );
};
