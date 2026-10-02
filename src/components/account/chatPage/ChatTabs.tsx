import { cn } from '@/lib/utils';
import { ChatTabsProps } from '@/types/chatType';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export default function ChatTabs({
  activeTab,
  unreadCount,
  onChange,
}: ChatTabsProps): JSX.Element {
  const t = useTranslations('chat.chatTabs');
  return (
    <div className="flex gap-4 bg-[#00BBA7]/50 mb-2 py-[14px] px-[16px] rounded-md">
      <button
        onClick={() => onChange('all')}
        className={cn(
          'group relative p-1 flex items-center gap-1 text-[#616161] dark:text-text-gray cursor-pointer',
          activeTab === 'all' &&
            'text-btn-active dark:text-btn-hover after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-white'
        )}
      >
        <span>{t('allChats')}</span>
      </button>

      <button
        onClick={() => onChange('unread')}
        className={cn(
          'group relative p-1 flex items-center gap-1 text-[#616161] dark:text-text-gray cursor-pointer',
          activeTab === 'unread' &&
            'text-btn-active dark:text-btn-hover after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-white'
        )}
      >
        <span>{t('unread')}</span>

        <span
          className={cn(
            'inline-flex w-5 h-5 items-center justify-center rounded-full text-white text-[12px] leading-none transition-colors',
            activeTab === 'unread'
              ? 'bg-btn-outline'
              : 'bg-text-gray group-hover:bg-btn-outline'
          )}
        >
          {unreadCount}
        </span>
      </button>
    </div>
  );
}
