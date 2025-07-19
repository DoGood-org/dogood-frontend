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
    <div className="flex items-center p-2 gap-2">
      {showBackButton && (
        <button
          onClick={onBack}
          className="p-2 text-current flex items-center"
          aria-label="Назад"
          type="button"
        >
          <Back className="w-5 h-5" />
          Back
        </button>
      )}
      <div className="flex flex-col">
        {selectedName && (
          <div className="text-sm font-medium pb-1 text-center">
            {selectedName}
          </div>
        )}
        <div className="relative flex-grow max-w-md">
          <Input
            type="text"
            placeholder={placeholderText}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="pl-4 pr-10 py-2 w-full text-current border-none shadow-none focus:ring-0 focus:border-none"
          />
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none text-current">
            <ChatSearch className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
