'use client';

import EllipsisIcon from '@/components/icons/EllipsisIcon';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { ChatModal } from '@/components/account/chatPage/ChatModal/ChatModal';
import { ChatType } from '@/types/chatType';
import { useEffect, useRef } from 'react';

type Props = {
  chat: ChatType;
};

export const ChatEllipsisMenu: React.FC<Props> = ({ chat }) => {
  const { isOpen, toggleMenu } = useMobileMenu();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleMenu]);

  const handleToggleMenu = (e: React.MouseEvent): void => {
    e.stopPropagation();
    toggleMenu();
  };

  return (
    <div ref={buttonRef} className="relative inline-block">
      <EllipsisIcon
        className="w-5 h-5 text-white cursor-pointer hover:text-btn-hover active:text-btn-active"
        onClick={handleToggleMenu}
      />
      {isOpen && (
        <ChatModal chat={chat} onClose={toggleMenu} menuRef={buttonRef} />
      )}
    </div>
  );
};
