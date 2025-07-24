'use client';

import EllipsisIcon from '@/components/icons/EllipsisIcon';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import { ChatModal } from '@/components/account/chatPage/ChatModal/ChatModal';
import { ChatType } from '@/types/chatType';
import { useEffect, useRef } from 'react';

type Props = {
  chat: ChatType;
};

export const ChatEllipsisMenu: React.FC<Props> = ({ chat }) => {
  const { isOpen, toggleMenu, closeMenu } = useMenuToggle();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenu]);

  const handleToggleMenu = (e: React.MouseEvent): void => {
    e.stopPropagation();
    toggleMenu();
  };

  return (
    <div ref={buttonRef}>
      <EllipsisIcon
        className="absolute top-0 right-2 w-5 h-5 text-white cursor-pointer 
        hover:text-btn-hover active:text-btn-active"
        onClick={handleToggleMenu}
      />
      {isOpen && (
        <ChatModal chat={chat} onClose={toggleMenu} menuRef={buttonRef} />
      )}
    </div>
  );
};
