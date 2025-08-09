'use client';

import MarkChat from '@/components/icons/MarkChat';
import PinChat from '@/components/icons/PinChat';
import TrashBinChat from '@/components/icons/TrashBinChat';
import UnpinChat from '@/components/icons/UnpinChat';
import { Button } from '@/components/ui/Button';
import { ChatType } from '@/types/chatType';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type ChatModalProps = {
  chat: ChatType;
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onChatDeleted: (chatId: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
};

export const ChatModal: React.FC<ChatModalProps> = ({
  chat,
  onClose,
  menuRef,
  onPinToggle,
}) => {
  const t = useTranslations('chat');

  const handleDelete = async (): Promise<void> => {
    console.log('Delete', chat.id);
    onClose();
  };

  const [pinned, setPinned] = useState(() => {
    return localStorage.getItem(`chatPinned-${chat.id}`) === 'true';
  });

  useEffect(() => {
    setPinned(
      chat.pinned ?? localStorage.getItem(`chatPinned-${chat.id}`) === 'true'
    );
  }, [chat.pinned, chat.id]);

  const handlePinToggle = (e: React.MouseEvent): void => {
    e.stopPropagation();
    const newPinned = !pinned;
    setPinned(newPinned);
    localStorage.setItem(`chatPinned-${chat.id}`, newPinned.toString());
    onPinToggle(chat.id, newPinned);
  };

  const handleMarkAsSpam = (): void => {
    console.log('Marked as spam', chat.id);
    onClose();
  };

  const buttons = pinned
    ? [
        {
          key: 'unpin',
          label: t('menu.unpin'),
          onClick: handlePinToggle,
          Icon: UnpinChat,
        },
        {
          key: 'delete',
          label: t('menu.delete'),
          onClick: handleDelete,
          Icon: TrashBinChat,
        },
        {
          key: 'spam',
          label: t('menu.mark as spam'),
          onClick: handleMarkAsSpam,
          Icon: MarkChat,
        },
      ]
    : [
        {
          key: 'delete',
          label: t('menu.delete'),
          onClick: handleDelete,
          Icon: TrashBinChat,
        },
        {
          key: 'pin',
          label: t('menu.pin the chat'),
          onClick: handlePinToggle,
          Icon: PinChat,
        },
        {
          key: 'spam',
          label: t('menu.mark as spam'),
          onClick: handleMarkAsSpam,
          Icon: MarkChat,
        },
      ];

  return (
    <div
      ref={menuRef}
      className="absolute top-4 right-0 bg-background py-6 px-5 rounded-lg shadow-lg z-50 min-w-[178px]"
    >
      <ul className="flex flex-col gap-4">
        {buttons.map(({ key, label, onClick, Icon }) => (
          <li key={key}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClick}
              className="group flex items-center justify-between w-full 
                hover:text-btn-hover active:text-btn-active cursor-pointer"
            >
              <span className="whitespace-nowrap">{label}</span>
              <Icon className="size-6 icon-color group-hover:text-btn-hover group-active:text-btn-active" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
