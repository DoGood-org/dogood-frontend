'use client';

import MessageSend from '@/components/icons/MessageSend';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

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
    <div className="relative pt-6">
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
      <Button
        type="button"
        variant="ghost"
        aria-label="Send a message"
        size="icon"
        onClick={sendMessage}
        className="absolute right-0 top-7 text-[#2C8C8C] focus:outline-none cursor-pointer"
      >
        <MessageSend className="w-6 h-6" />
      </Button>
    </div>
  );
};
