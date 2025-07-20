'use client';

import Back from '@/components/icons/Back';
import ChatSearch from '@/components/icons/ChatSearch';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

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
    ? `was on the network at ${formattedTime}`
    : '';

  return (
    <div className="flex w-[338px] items-center">
      {showBackButton && (
        <button
          onClick={onBack}
          className="text-current flex items-center pr-2 cursor-pointer"
          aria-label="Back"
          type="button"
        >
          <Back className="w-5 h-5" />
          <span className="text-base">Back</span>
        </button>
      )}
      <div className="flex items-center">
        <div className="flex flex-col">
          {selectedName && (
            <p className="text-center mb-2 break-words">{selectedName}</p>
          )}
          <Input
            type="text"
            placeholder={placeholderText}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="border-none focus:outline-none focus:ring-0 appearance-none w-[240px] h-[24px] p-0 text-current bg-transparent border-0 shadow-none outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <button
        className="text-current cursor-pointer"
        aria-label="search"
        type="button"
      >
        <ChatSearch className="w-5 h-5" />
      </button>
    </div>
  );
};
