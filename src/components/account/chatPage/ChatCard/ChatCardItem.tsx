'use client';

import { cn } from '@/lib/utils';
import { ChatCardProps } from '@/types/chatType';

import Image from 'next/image';
import { ChatEllipsisMenu } from '@/components';

export const ChatCardItem: React.FC<ChatCardProps> = ({
  chat,
  isSelected,
  onSelect,
  onChatDeleted,
}) => {
  const handleDelete = (): void => {
    onChatDeleted(chat.id);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <li
      onClick={() => onSelect(chat.id)}
      className={cn(
        'relative flex items-center gap-4 py-5 px-6 bg-tag dark:bg-[#393939] rounded-sm cursor-pointer border',
        isSelected ? 'border-border' : 'border-transparent hover:border-border'
      )}
    >
      <div className="absolute top-1 right-0 mb-2">
        <ChatEllipsisMenu chat={chat} onChatDeleted={handleDelete} />
      </div>
      <Image
        src="/avatars/dmytro.png"
        alt="avatar"
        width={64}
        height={64}
        className="w-[64px] h-[64px] rounded-full object-cover bg-white"
      />
      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex justify-between items-center mb-2">
          <p className="text-white font-semibold text-base truncate">
            {chat.name}
          </p>
          <span className="text-white text-sm whitespace-nowrap">
            {formatDate(chat.createdAt)}
          </span>
        </div>
        <p className="text-white text-base truncate">{chat.content}</p>
      </div>
    </li>
  );
};
