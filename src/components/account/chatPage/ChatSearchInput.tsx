'use client';

import Back from '@/components/icons/Back';
import ChatSearch from '@/components/icons/ChatSearch';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

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

  function formatTime(dateString: string): string {
    const d = new Date(dateString);
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  const formattedTime = lastMessageTime ? formatTime(lastMessageTime) : '';

  const placeholderText = formattedTime
    ? t('input.wasOnNetworkAt', { time: formattedTime })
    : t('input.searchPlaceholder');

  return (
    <div className="flex items-center justify-between">
      {showBackButton && (
        <button
          onClick={onBack}
          className="text-current flex items-center pr-2 cursor-pointer group"
          aria-label="Back"
          type="button"
        >
          <Back className="w-5 h-5 text-bg-icon mr-2 group-hover:text-btn-hover group-active:text-btn-active" />
          <span className="text-base text-foreground group-hover:text-btn-hover group-active:text-btn-active">
            {t('back')}
          </span>
        </button>
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
            p-0
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
        className="text-current cursor-pointer"
        aria-label="search"
        type="button"
        onClick={handleSearch}
      >
        <ChatSearch className="w-5 h-5 text-bg-icon hover:text-btn-hover active:text-btn-active" />
      </Button>
    </div>
  );
};
