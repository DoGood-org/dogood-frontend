'use client';

import Back from '@/components/icons/Back';
import ChatSearch from '@/components/icons/ChatSearch';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatChatTime } from '@/utils/chatDateUtils';

interface ChatSearchInputProps {
  selectedName: string;
  lastMessageTime: string | null;
  lastOnline: string;
  showBackButton: boolean;
  onBack: () => void;
  onSearch: (query: string) => void;
}

export const ChatSearchInput: React.FC<ChatSearchInputProps> = ({
  selectedName,
  lastMessageTime,
  showBackButton,
  onBack,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('chat');

  const handleSearch = (): void => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      onSearch(trimmed);
      setSearchQuery('');
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formattedTime = lastMessageTime ? formatChatTime(lastMessageTime) : '';

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
            <Back className="w-5 h-5 text-bg-icon group-hover:text-btn-hover group-active:text-btn-active" />
            <span className="text-base text-foreground group-hover:text-btn-hover group-active:text-btn-active">
              {t('back')}
            </span>
          </Button>
        </div>
      )}
      <div className="flex items-center">
        <div className="flex flex-col">
          {selectedName && (
            <p className="text-center mb-2 break-words font-semibold text-foreground md:font-bold lg:text-left">
              {selectedName}
            </p>
          )}
          <Input
            type="text"
            placeholder={placeholderText}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="
            w-[240px]
            h-[24px]
            py-0
            pl-2
            pr-0
            md:pl-0
            bg-transparent
            text-current
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
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-current cursor-pointer w-6 h-6"
        aria-label="search"
        type="button"
        onClick={handleSearch}
      >
        <ChatSearch className="w-6 h-6 text-bg-icon hover:text-btn-hover active:text-btn-active" />
      </Button>
    </div>
  );
};
