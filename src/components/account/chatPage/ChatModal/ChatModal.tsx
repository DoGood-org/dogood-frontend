'use client';

import MarkChat from '@/components/icons/MarkChat';
import PinChat from '@/components/icons/PinChat';
import TrashBinChat from '@/components/icons/TrashBinChat';
import UnpinChat from '@/components/icons/UnpinChat';
import { ChatType } from '@/types/chatType';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type ChatModalProps = {
  chat: ChatType;
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onChatDeleted: (chatId: string) => void;
};

export const ChatModal: React.FC<ChatModalProps> = ({
  chat,
  onClose,
  menuRef,
}) => {
  const t = useTranslations('chat');
  const [pinned, setPinned] = useState(false);

  const handleDelete = async (): Promise<void> => {
    console.log('Delete', chat.id);
    onClose();
  };

  const handlePinToggle = (): void => {
    setPinned((prev) => !prev);
    console.log(pinned ? 'Unpinned' : 'Pinned', chat.id);
    onClose();
  };

  const handleMarkAsSpam = (): void => {
    console.log('Marked as spam', chat.id);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute top-4 right-0 bg-background py-6 px-5 rounded-lg shadow-lg z-50 min-w-[178px]"
    >
      <ul className="flex flex-col gap-4">
        <li>
          <button
            onClick={handleDelete}
            className="group flex items-center justify-between w-full 
                        hover:text-btn-hover active:text-btn-active cursor-pointer"
          >
            <span className="whitespace-nowrap">{t('menu.delete')}</span>
            <TrashBinChat className="w-6 h-6 icon-color group-hover:text-btn-hover group-active:text-btn-active" />
          </button>
        </li>
        <li>
          <button
            onClick={handlePinToggle}
            className="group flex items-center justify-between w-full 
                        hover:text-btn-hover active:text-btn-active cursor-pointer"
          >
            <span className="whitespace-nowrap">
              {pinned ? t('menu.unpin') : t('menu.pin the chat')}
            </span>
            {pinned ? (
              <UnpinChat className="w-6 h-6 icon-color group-hover:text-btn-hover group-active:text-btn-active" />
            ) : (
              <PinChat className="w-6 h-6 icon-color group-hover:text-btn-hover group-active:text-btn-active" />
            )}
          </button>
        </li>
        <li>
          <button
            onClick={handleMarkAsSpam}
            className="group flex items-center justify-between w-full 
                        hover:text-btn-hover active:text-btn-active cursor-pointer"
          >
            <span className="whitespace-nowrap">{t('menu.mark as spam')}</span>
            <MarkChat className="w-6 h-6 icon-color group-hover:text-btn-hover group-active:text-btn-active" />
          </button>
        </li>
      </ul>
    </div>
  );
};
