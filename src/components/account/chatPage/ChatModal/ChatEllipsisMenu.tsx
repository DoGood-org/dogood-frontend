'use client';

import EllipsisIcon from '@/components/icons/EllipsisIcon';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import { ChatModal } from '@/components/account/chatPage/ChatModal/ChatModal';
import { ChatType } from '@/types/chatType';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import * as Tooltip from '@radix-ui/react-tooltip';

type Props = {
  chat: ChatType;
  onChatDeleted: (chatId: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
};

export const ChatEllipsisMenu: React.FC<Props> = ({
  chat,
  onChatDeleted,
  onPinToggle,
}) => {
  const { isOpen, toggleMenu, closeMenu } = useMenuToggle();
  const buttonRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('chat');

  const handleClickOutside = useCallback(
    (e: MouseEvent): void => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    },
    [closeMenu]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggleMenu = (e: React.MouseEvent<SVGSVGElement>): void => {
    e.stopPropagation();
    toggleMenu();
  };

  return (
    <Tooltip.Provider>
      <div ref={buttonRef}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <EllipsisIcon
              className="absolute top-0 right-2 w-5 h-5 text-white cursor-pointer 
              hover:text-btn-hover active:text-btn-active"
              onClick={handleToggleMenu}
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              sideOffset={5}
              className="dark:bg-gray-900 text-white rounded px-2 py-1 text-xs select-none shadow-lg
                        bg-[#5D5A5A] dark:text-[#f1f1f1]"
            >
              {t('menu.tooltip')}
              <Tooltip.Arrow className="dark:fill-gray-900 fill-[#5D5A5A]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        {isOpen && (
          <ChatModal
            chat={chat}
            onClose={toggleMenu}
            menuRef={buttonRef}
            onChatDeleted={onChatDeleted}
            onPinToggle={onPinToggle}
          />
        )}
      </div>
    </Tooltip.Provider>
  );
};
