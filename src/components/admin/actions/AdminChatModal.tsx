'use client';

import { AdminUser, TrashBinChat, UnlockIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

type ChatModalProps = {
  onClose: () => void;
};

export const AdminChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  const t = useTranslations('chat.adminMenu');

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
      label: t('reviewAccount'),
      onClick: handleReview,
      Icon: AdminUser,
    },
    {
      key: 'block',
      label: t('blockAccount'),
      onClick: handleBlock,
      Icon: UnlockIcon,
    },
    {
      key: 'delete',
      label: t('deleteHistory'),
      onClick: handleDelete,
      Icon: TrashBinChat,
    },
  ];

  return (
    <ul className="flex flex-col gap-3 min-w-[228px] w-full">
      {buttons.map(({ key, label, onClick, Icon: Icon }) => (
        <li key={key}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="group flex justify-start gap-3 w-full cursor-pointer"
          >
            {Icon && (
              <Icon className="size-6 text-foreground group-hover:text-btn-outline dark:group-hover:text-btn-hover dark:group-active:text-btn-hover" />
            )}
            <span className="whitespace-nowrap text-foreground group-hover:text-btn-outline dark:group-hover:text-btn-hover dark:group-active:text-btn-hover">
              {label}
            </span>
          </Button>
        </li>
      ))}
    </ul>
  );
};
