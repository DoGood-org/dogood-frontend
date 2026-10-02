import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChatType } from '@/types/chatType';

const sortChats = (chatList: ChatType[]): ChatType[] =>
  [...chatList].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;

    return a.pinned ? -1 : 1;
  });

const getPinnedFromStorage = (): string[] => {
  try {
    const value = localStorage.getItem('pinnedChats');
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

interface UsePinnedChatsReturn {
  chats: ChatType[];
  handlePinToggle: (chatId: string, pinned: boolean) => void;
}

export const usePinnedChats = (
  initialChats: ChatType[]
): UsePinnedChatsReturn => {
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  useEffect(() => {
    setPinnedIds(getPinnedFromStorage());
  }, []);

  const chats = useMemo(
    () =>
      sortChats(
        initialChats.map((chat) => ({
          ...chat,
          pinned: pinnedIds.includes(chat.id),
        }))
      ),
    [initialChats, pinnedIds]
  );

  const handlePinToggle = useCallback((chatId: string, pinned: boolean) => {
    setPinnedIds((prev) => {
      const next = pinned
        ? prev.includes(chatId)
          ? prev
          : [...prev, chatId]
        : prev.filter((id) => id !== chatId);

      try {
        localStorage.setItem('pinnedChats', JSON.stringify(next));
      } catch {
        console.warn('Failed to save pinnedChats to localStorage');
      }

      return next;
    });
  }, []);

  return {
    chats,
    handlePinToggle,
  };
};
