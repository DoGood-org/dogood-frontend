'use client';

import Back from '@/components/icons/Back';
import ChatSearch from '@/components/icons/ChatSearch';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ChatSearchInputProps {
  selectedName: string;
  lastMessageTime: string;
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
    onSearch(searchQuery.trim());
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formattedTime = lastMessageTime
    ? new Date(lastMessageTime).toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '';

  const placeholderText = formattedTime
    ? t('input.wasOnNetworkAt', { time: formattedTime })
    : t('input.yourMessage');

  return (
    <div className="flex items-center justify-between">
      {showBackButton && (
        <button
          onClick={onBack}
          className="text-current flex items-center pr-2 cursor-pointer"
          aria-label="Back"
          type="button"
        >
          <Back className="w-5 h-5 text-bg-icon mr-2 hover:text-btn-hover active:text-btn-active" />
          <span className="text-base text-foreground hover:text-btn-hover active:text-btn-active">
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
          <input
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
            border-none
            border-0
            focus:border-none
            focus:border-transparent
            outline-none
            focus:outline-none
            ring-0
            focus:ring-0
            focus:ring-transparent
            appearance-none
            shadow-none"
          />
        </div>
      </div>
      <button
        className="text-current cursor-pointer"
        aria-label="search"
        type="button"
      >
        <ChatSearch className="w-5 h-5 text-bg-icon" />
      </button>
    </div>
  );
};
