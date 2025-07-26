'use client';

import MarkChat from '@/components/icons/MarkChat';
import PinChat from '@/components/icons/PinChat';
import TrashBinChat from '@/components/icons/TrashBinChat';
import { ChatType } from '@/types/chatType';
import { ChatServices } from '@/zustand/services/chatService';

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
  onChatDeleted,
}) => {
  const handleDelete = async (): Promise<void> => {
    try {
      await ChatServices.deleteChat(chat.id);
      onChatDeleted(chat.id);
      onClose();
    } catch (error) {
      throw error;
    }
  };

  const handlePin = (): void => {
    // виклик API закріплення
    console.log('Pinned', chat.id);
    onClose();
  };

  const handleMarkAsSpam = (): void => {
    // виклик API позначення як спам
    console.log('Marked as spam', chat.id);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="w-[178px] absolute top-4 right-0 bg-background py-6 px-5 rounded-lg shadow-lg z-50"
    >
      <ul className="flex flex-col gap-4">
        <li>
          <button
            onClick={handleDelete}
            className="group flex items-center justify-between w-full 
                        hover:text-btn-hover active:text-btn-active cursor-pointer"
          >
            Delete
            <TrashBinChat className="icon-color group-hover:text-btn-hover group-active:text-btn-active" />
          </button>
        </li>
        <li>
          <button
            onClick={handlePin}
            className="group flex items-center justify-between w-full 
                        hover:text-btn-hover active:text-btn-active cursor-pointer"
          >
            Pin the chat
            <PinChat className="icon-color group-hover:text-btn-hover group-active:text-btn-active" />
          </button>
        </li>
        <li>
          <button
            onClick={handleMarkAsSpam}
            className="group flex items-center justify-between w-full 
                        hover:text-btn-hover active:text-btn-active cursor-pointer"
          >
            Mark as spam
            <MarkChat className="icon-color group-hover:text-btn-hover group-active:text-btn-active" />
          </button>
        </li>
      </ul>
    </div>
  );
};
