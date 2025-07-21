import EllipsisIcon from '@/components/icons/EllipsisIcon';
import { cn } from '@/lib/utils';
import { ChatCardProps } from '@/types/chatType';

import Image from 'next/image';

export const ChatCardItem: React.FC<ChatCardProps> = ({
  chat,
  isSelected,
  onSelect,
}) => {
  return (
    <li
      onClick={() => onSelect(chat.id)}
      className={cn(
        'relative flex items-center gap-4 py-5 px-6 bg-tag dark:bg-[#393939] rounded-sm cursor-pointer border',
        isSelected ? 'border-border' : 'border-transparent hover:border-border'
      )}
    >
      <div className="absolute top-1 right-3 mb-2">
        <EllipsisIcon className="w-5 h-5 text-white cursor-pointer" />
      </div>
      <Image
        src={chat.userAvatarUrl}
        alt={`${chat.userNickname} avatar`}
        width={64}
        height={64}
        className="w-[64px] h-[64px] rounded-full object-cover bg-white"
      />
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <p className="text-white font-semibold text-base truncate">
            {chat.userNickname}
          </p>
          <span className="text-white text-sm whitespace-nowrap">
            {chat.lastMessageDate}
          </span>
        </div>
        <p className="text-white text-base truncate">{chat.lastMessageText}</p>
      </div>
    </li>
  );
};
