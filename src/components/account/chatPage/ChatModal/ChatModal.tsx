'use client';

import MarkChat from '@/components/icons/MarkChat';
import PinChat from '@/components/icons/PinChat';
import TrashBinChat from '@/components/icons/TrashBinChat';
import UnpinChat from '@/components/icons/UnpinChat';
import { Button } from '@/components/ui/Button';
import { ChatType } from '@/types/chatType';
import { useTranslations } from 'next-intl';

type ChatModalProps = {
  chat: ChatType;
  onClose: () => void;
  onChatDeleted: (chatId: string) => void;
  onPinToggle?: (chatId: string, pinned: boolean) => void;
  showPinActions?: boolean;
};

export const ChatModal: React.FC<ChatModalProps> = ({
  chat,
  onClose,
  onPinToggle,
  onChatDeleted,
  showPinActions = true,
}) => {
  const t = useTranslations('chat');
  const pinned = chat.pinned ?? false;

  const handleDelete = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onChatDeleted(chat.id);
    onClose();
  };

  const handlePinToggle = (e: React.MouseEvent): void => {
    e.stopPropagation();

    onPinToggle?.(chat.id, !pinned);
    onClose();
  };

  const handleMarkAsSpam = (): void => {
    console.log('Marked as spam', chat.id);
    onClose();
  };

  const buttons = [
    {
      key: 'delete',
      label: t('menu.delete'),
      onClick: handleDelete,
      Icon: TrashBinChat,
    },
  ];

  if (showPinActions && onPinToggle) {
    buttons.splice(1, 0, {
      key: pinned ? 'unpin' : 'pin',
      label: pinned ? t('menu.unpin') : t('menu.pin the chat'),
      onClick: handlePinToggle,
      Icon: pinned ? UnpinChat : PinChat,
    });
  }

  buttons.push({
    key: 'spam',
    label: t('menu.mark as spam'),
    onClick: handleMarkAsSpam,
    Icon: MarkChat,
  });

  return (
    <ul className="flex flex-col gap-3 min-w-[178px]">
      {buttons.map(({ key, label, onClick, Icon }) => (
        <li key={key}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="group flex items-center justify-between w-full 
                hover:text-btn-hover active:text-btn-active cursor-pointer"
          >
            <span className="whitespace-nowrap text-foreground group-hover:text-btn-hover group-active:text-btn-active">
              {label}
            </span>
            <Icon className="size-6 text-foreground group-hover:text-btn-hover group-active:text-btn-active" />
          </Button>
        </li>
      ))}
    </ul>
  );
};
