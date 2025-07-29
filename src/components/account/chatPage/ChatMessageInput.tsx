'use client';

import MessageSend from '@/components/icons/MessageSend';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface MessageInputProps {
  onSend: (message: string) => void;
}

export const ChatMessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const t = useTranslations('chat');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const sendMessage = (): void => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="relative">
      <Input
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={t('input.yourMessage')}
        className="
        w-full
        h-[48px]
        py-3 px-2    
        dark:placeholder:text-[#0C0C0C] 
        placeholder:text-white        
        dark:bg-white
        bg-text-gray
        rounded-sm
        border border-transparent
        focus:border-border
        outline-none
        focus:outline-none
        ring-0
        focus:ring-0
        focus:ring-transparent
        appearance-none
        shadow-none
        cursor-pointer"
      />
      <button
        type="button"
        onClick={sendMessage}
        className="absolute right-4 top-3 text-[#1B9757] focus:outline-none cursor-pointer"
      >
        <MessageSend className="w-5 h-5" />
      </button>
    </div>
  );
};
