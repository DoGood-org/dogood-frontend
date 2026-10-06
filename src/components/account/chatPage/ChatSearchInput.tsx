'use client';

import ChatSearch from '@/components/icons/ChatSearch';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatChatTime } from '@/utils/chatDateUtils';
import { LeftArrow } from '@/components/icons';

interface ChatSearchInputProps {
  selectedName: string;
  lastMessageTime: string | null;
  lastOnline: string;
  showBackButton: boolean;
  onBack: () => void;
  onSearch: (query: string) => void;
  variant?: 'chat' | 'admin';
  rightElement?: React.ReactNode;
}

export const ChatSearchInput: React.FC<ChatSearchInputProps> = ({
  selectedName,
  lastMessageTime,
  showBackButton,
  onBack,
  onSearch,
  rightElement,
  variant = 'chat',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('chat');

  const handleChange = (value: string): void => {
    setSearchQuery(value);
    onSearch(value);
  };

  const formattedTime = lastMessageTime
    ? formatChatTime(lastMessageTime, true)
    : '';

  const placeholderText = formattedTime
    ? t('input.wasOnNetworkAt', { time: formattedTime })
    : '';

  return (
    <div className="flex items-center justify-between">
      {showBackButton && (
        <div className="pl-2 md:pl-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-current flex items-center gap-0 md:gap-2 cursor-pointer group"
            aria-label="Back"
            type="button"
          >
            <LeftArrow className="size-6" />
          </Button>
        </div>
      )}
      <div className="flex items-center">
        <div className="flex flex-col">
          {selectedName && (
            <p className="text-center break-words font-semibold text-foreground md:font-bold lg:text-left">
              {selectedName}
            </p>
          )}
          {variant === 'admin' ? (
            <p className="text-xs text-foreground select-none cursor-default">
              {placeholderText}
            </p>
          ) : (
            <Input
              type="text"
              placeholder={placeholderText}
              value={searchQuery}
              onChange={(e) => handleChange(e.target.value)}
              className="
            w-[240px]
            h-[24px]
            md:pl-0
            bg-transparent
            text-current
            text-xs
            placeholder:text-foreground
            hover:placeholder:text-btn-hover
            focus:placeholder:text-btn-active

            border-none
            outline-none
            ring-0

            focus:border-none
            focus:outline-none
            focus:ring-0
            focus:ring-transparent
            focus-visible:ring-0
            focus-visible:outline-none
            focus-visible:border-none

            appearance-none
            shadow-none
            transition-none"
            />
          )}
        </div>
      </div>
      {rightElement ?? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-current cursor-pointer w-6 h-6"
          aria-label="Search"
        >
          <ChatSearch className="size-6 text-bg-icon hover:text-btn-hover active:text-btn-active" />
        </Button>
      )}
    </div>
  );
};
