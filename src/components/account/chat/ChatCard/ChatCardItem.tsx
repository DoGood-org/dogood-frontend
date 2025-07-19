import EllipsisIcon from '@/components/icons/EllipsisIcon';
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
      className={`flex items-center gap-4 p-3 bg-text-help rounded cursor-pointer ${
        isSelected ? 'border-2 border-green-500' : 'hover:border-green-500'
      }`}
    >
      <Image
        src={chat.userAvatarUrl}
        alt={`${chat.userNickname} avatar`}
        width={40}
        height={40}
        className="rounded-full object-cover bg-amber-700"
      />
      <div className="flex flex-col flex-grow overflow-hidden">
        <span className="font-semibold truncate">{chat.userNickname}</span>
        <span className="text-sm text-gray-600 truncate">
          {chat.lastMessageText}
        </span>
      </div>
      <div className="flex flex-col">
        <EllipsisIcon className="w-5 h-1 btn-primary" />
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {chat.lastMessageDate}
        </span>
      </div>
    </li>
  );
};
