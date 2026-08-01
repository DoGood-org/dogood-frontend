'use client';

import { AdminUser, TrashBinChat, UnlockIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';

// import { useTranslations } from "next-intl";

type ChatModalProps = {
  // chat: ChatType;
  onClose: () => void;
  // menuRef: React.RefObject<HTMLDivElement | null>;
  onChatDeleted: (chatId: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
};

export const AdminChatModal: React.FC<ChatModalProps> = ({
  onClose,
  // menuRef,
}) => {
  // const t = useTranslations('chat');

  const handleDelete = async (): Promise<void> => {
    onClose();
  };

  const handleReview = (): void => {
    onClose();
  };

  const handleBlock = (): void => {
    onClose();
  };

  const buttons = [
    {
      key: 'reviews',
      label: 'Review account',
      onClick: handleReview,
      Icon: AdminUser,
    },
    {
      key: 'block',
      label: 'Block account',
      onClick: handleBlock,
      Icon: UnlockIcon,
    },
    {
      key: 'delete',
      label: 'Delete history',
      onClick: handleDelete,
      Icon: TrashBinChat,
    },
  ];

  return (
    <ul className="flex flex-col gap-3 min-w-[228px]">
      {buttons.map(({ key, label, onClick, Icon: Icon }) => (
        <li key={key}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="group flex justify-start gap-3 w-full 
                hover:text-btn-hover active:text-btn-active cursor-pointer"
          >
            {Icon && (
              <Icon className="size-6 text-foreground group-hover:text-btn-hover group-active:text-btn-active" />
            )}
            <span className="whitespace-nowrap text-foreground group-hover:text-btn-hover group-active:text-btn-active">
              {label}
            </span>
          </Button>
        </li>
      ))}
    </ul>
  );
};
