import { ChatType } from '@/types/chatType';
import { useState, useEffect, useCallback } from 'react';

const sortChats = (chatList: ChatType[]): ChatType[] =>
  [...chatList].sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));

const getPinnedFromStorage = (): string[] => {
  try {
    const pinnedIdsStr = localStorage.getItem('pinnedChats');
    if (!pinnedIdsStr) return [];
    return JSON.parse(pinnedIdsStr);
  } catch {
    return [];
  }
};

interface UseChatsReturn {
  chats: ChatType[];
  selectedChatId: string | null;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | null>>;
  handleChatDeleted: (chatId: string) => void;
  handlePinToggle: (chatId: string, pinned: boolean) => void;
}

export const useChats = (
  initialChats: ChatType[],
  isMobileOrTablet: boolean
): UseChatsReturn => {
  const [chats, setChats] = useState<ChatType[]>(() => {
    const pinnedIds = getPinnedFromStorage();
    return sortChats(
      initialChats.map((chat) => ({
        ...chat,
        pinned: pinnedIds.includes(chat.id),
      }))
    );
  });

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    const pinnedIds = chats
      .filter((chat) => chat.pinned)
      .map((chat) => chat.id);
    const stored = localStorage.getItem('pinnedChats');

    if (stored !== JSON.stringify(pinnedIds)) {
      localStorage.setItem('pinnedChats', JSON.stringify(pinnedIds));
    }
  }, [chats]);

  useEffect(() => {
    if (!isMobileOrTablet) {
      setChats((prev) => sortChats(prev));
    }
  }, [isMobileOrTablet]);

  useEffect(() => {
    if (isMobileOrTablet) {
      setSelectedChatId(null);
      return;
    }

    const lastChatId = localStorage.getItem('lastChatId');
    const sortedChats = sortChats(chats);

    if (lastChatId && sortedChats.some((chat) => chat.id === lastChatId)) {
      setSelectedChatId(lastChatId);
    } else if (sortedChats.length > 0) {
      setSelectedChatId(sortedChats[0].id);
    } else {
      setSelectedChatId(null);
    }
  }, [chats, isMobileOrTablet]);

  useEffect(() => {
    if (selectedChatId) {
      localStorage.setItem('lastChatId', selectedChatId);
    } else {
      localStorage.removeItem('lastChatId');
    }
  }, [selectedChatId]);

  const handleChatDeleted = useCallback(
    (chatId: string): void => {
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
      if (selectedChatId === chatId) {
        setSelectedChatId(null);
      }
    },
    [selectedChatId]
  );

  const handlePinToggle = useCallback(
    (chatId: string, pinned: boolean): void => {
      setChats((prev) => {
        const updated = prev.map((chat) =>
          chat.id === chatId ? { ...chat, pinned } : chat
        );
        const sorted = sortChats(updated);

        if (pinned) {
          setSelectedChatId(chatId);
        } else {
          const firstPinned = sorted.find((chat) => chat.pinned);
          setSelectedChatId(firstPinned?.id || sorted[0]?.id || null);
        }
        return sorted;
      });
    },
    []
  );

  return {
    chats,
    selectedChatId,
    setSelectedChatId,
    handleChatDeleted,
    handlePinToggle,
  };
};
