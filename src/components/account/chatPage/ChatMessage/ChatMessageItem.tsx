'use client';

import { MessageItemProps } from '@/types/chatType';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { formatChatTime } from '@/utils/chatDateUtils';

export const ChatMessageItem: React.FC<MessageItemProps> = ({ message }) => {
  if (message.isCurrentUser) {
    return (
      <li className="flex w-full items-end justify-end gap-2">
        <div className="flex flex-col md:flex-row-reverse items-end gap-1 md:gap-2">
          <div className="md:max-w-[358px] lg:max-w-[382px] text-text-tag rounded-md bg-[#00BBA7]/60  dark:bg-[#00BBA7]/40 p-3 md:p-4">
            <p className="break-words">{message.content}</p>
          </div>

          <span className="text-xs opacity-70 self-start md:self-auto">
            {formatChatTime(message.createdAt)}
          </span>
        </div>

        <Avatar className="h-[42px] w-[42px] shrink-0 mb-6 md:mb-0">
          <AvatarImage src={message.avatar} alt={message.name} />
          <AvatarFallback name={message.name} />
        </Avatar>
      </li>
    );
  }

  return (
    <li className="flex w-full items-end gap-2">
      <Avatar className="h-[42px] w-[42px] shrink-0 mb-6 md:mb-0">
        <AvatarImage src={message.avatar} alt={message.name} />
        <AvatarFallback name={message.name} />
      </Avatar>

      <div className="flex flex-col md:flex-row items-start md:items-end gap-1 md:gap-2">
        <div className="md:max-w-[358px] lg:max-w-[382px] rounded-md text-text-tag bg-modal dark:bg-text-gray p-3 md:p-4">
          <p className="break-words">{message.content}</p>
        </div>

        <span className="text-xs opacity-70 self-end md:self-auto">
          {formatChatTime(message.createdAt)}
        </span>
      </div>
    </li>
  );
};
