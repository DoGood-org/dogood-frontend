'use client';

import { cn } from '@/lib/utils';
import { ChatCardProps } from '@/types/chatType';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { formatChatDate } from '@/utils/chatDateUtils';
import { ChatEllipsisMenu } from '../ChatModal/ChatEllipsisMenu';

export const ChatCardItem: React.FC<ChatCardProps> = ({
  chat,
  isSelected,
  onSelect,
  onChatDeleted,
  onPinToggle,
  showEllipsisMenu = true,
  isAdmin = false,
}) => {
  const handleDelete = (): void => {
    onChatDeleted(chat.id);
  };

  const hasUnread = (chat.unreadCount ?? 0) > 0;
  const unreadCount = chat.unreadCount ?? 0;

  return (
    <li
      onClick={() => onSelect(chat.id)}
      className={cn(
        'relative h-[88px] flex items-center gap-4 py-5 px-6 rounded-md cursor-pointer border transition-colors',
        isAdmin ? 'h-[88px]' : 'h-[104px]',

        isSelected
          ? 'border-border bg-card'
          : hasUnread
            ? 'border-transparent bg-card hover:border-border dark:bg-text-gray/50'
            : 'border-transparent bg-modal hover:border-border'
      )}
    >
      {showEllipsisMenu && (
        <div className="absolute top-1 right-0 mb-2">
          <ChatEllipsisMenu
            chat={chat}
            onChatDeleted={handleDelete}
            onPinToggle={onPinToggle}
            showPinActions={!isAdmin}
          />
        </div>
      )}

      <Avatar className="w-[64px] h-[64px] rounded-full shrink-0">
        <AvatarImage src={chat.avatar} alt={chat.name} />
        <AvatarFallback name={chat.name} />
      </Avatar>

      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex items-center mb-2">
          <p className="text-text-tag font-semibold text-base truncate">
            {chat.name}
          </p>

          {unreadCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center ml-2 rounded-full bg-btn-outline px-1 text-xs font-medium text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}

          <span className="text-sm whitespace-nowrap ml-auto">
            {formatChatDate(chat.createdAt)}
          </span>
        </div>

        <p className="text-text-tag text-base truncate">{chat.content}</p>
      </div>
    </li>
  );
};
