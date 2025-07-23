'use client';

import MarkChat from '@/components/icons/MarkChat';
import PinChat from '@/components/icons/PinChat';
import TrashBinChat from '@/components/icons/TrashBinChat';
import Portal from '@/components/ui/portal/Portal';
import { ChatType } from '@/types/chatType';

type ChatModalProps = {
  chat: ChatType;
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
};

export const ChatModal: React.FC<ChatModalProps> = ({
  chat,
  onClose,
  menuRef,
}) => {
  const handleDelete = (): void => {
    // виклик API видалення
    console.log('Deleted', chat.id);
    onClose();
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
    <Portal>
      <div
        ref={menuRef}
        className="w-[178px]  absolute top-0 left-0 bg-background py-6 px-5 rounded-lg shadow-lg z-50"
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
    </Portal>
  );
};
