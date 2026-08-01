'use client';

import { ChatSearch } from '@/components/icons';
import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';

interface ChatListSearchProps {
  value: string;
  onSearch?: (query: string) => void;
}

export const ChatListSearch: React.FC<ChatListSearchProps> = ({
  onSearch,
  value,
}) => {
  const t = useTranslations('chat.chatTabs');

  return (
    <div className="relative flex items-center mb-2">
      <ChatSearch className="absolute rotate-90 left-2 size-6 stroke-[#999999]" />

      <Input
        type="text"
        placeholder={t('search')}
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
        className="
          h-12
          w-full
          pl-10
          rounded-md
          bg-white
          dark:bg-[#303030]
          border-none
          text-sm
          text-foreground
          placeholder:text-foreground
          focus-visible:ring-0
        "
      />
    </div>
  );
};
