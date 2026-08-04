import { ChatPreviewType, ChatType, MessageType } from '@/types/chatType';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

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

const applyPinned = (chatList: ChatType[]): ChatType[] => {
  const pinnedIds = getPinnedFromStorage();
  return sortChats(
    chatList.map((chat) => ({ ...chat, pinned: pinnedIds.includes(chat.id) }))
  );
};

const getLastMessage = (
  chat: ChatType,
  localMessages: MessageType[]
): MessageType | null => {
  const candidates: MessageType[] = [];

  if (chat.messages?.length) candidates.push(...chat.messages);
  if (Array.isArray(localMessages)) {
    candidates.push(...localMessages.filter((m) => m?.roomId === chat.id));
  }
  if (candidates.length === 0) return null;

  return candidates.reduce((latest, msg) =>
    new Date(msg.createdAt).getTime() > new Date(latest.createdAt).getTime()
      ? msg
      : latest
  );
};

interface UseChatsReturn {
  chats: ChatPreviewType[];
  selectedChatId: string | null;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | null>>;
  handleChatDeleted: (chatId: string) => void;
  handlePinToggle: (chatId: string, pinned: boolean) => void;
}

export const useChats = (
  initialChats: ChatType[],
  messages: MessageType[],
  isMobileOrTablet: boolean,
  isLoading: boolean,
  urlChatId?: string | null
): UseChatsReturn => {
  const [chats, setChats] = useState<ChatType[]>(() =>
    applyPinned(initialChats)
  );
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const didInitSelectionRef = useRef(false);

  useEffect(() => {
    setChats(applyPinned(initialChats));
  }, [initialChats]);

  useEffect(() => {
    if (isLoading) return;

    const pinnedIds = chats
      .filter((chat) => chat.pinned)
      .map((chat) => chat.id);
    const stored = localStorage.getItem('pinnedChats');

    if (stored !== JSON.stringify(pinnedIds)) {
      localStorage.setItem('pinnedChats', JSON.stringify(pinnedIds));
    }
  }, [chats, isLoading]);

  useEffect(() => {
    if (!isMobileOrTablet) {
      setChats((prev) => sortChats(prev));
    }
  }, [isMobileOrTablet]);

  useEffect(() => {
    if (isMobileOrTablet) {
      setSelectedChatId(null);
      didInitSelectionRef.current = false;
      return;
    }

    if (isLoading || didInitSelectionRef.current || chats.length === 0) return;

    didInitSelectionRef.current = true;

    const targetChatId = urlChatId || localStorage.getItem('lastChatId');
    const sorted = sortChats(chats);

    setSelectedChatId(
      targetChatId && sorted.some((chat) => chat.id === targetChatId)
        ? targetChatId
        : sorted[0].id
    );
  }, [chats, isMobileOrTablet, isLoading, urlChatId]);

  useEffect(() => {
    if (isLoading) return;

    if (selectedChatId) {
      localStorage.setItem('lastChatId', selectedChatId);
    } else {
      localStorage.removeItem('lastChatId');
    }
  }, [selectedChatId, isLoading]);

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
      const updated = sortChats(
        chats.map((chat) => (chat.id === chatId ? { ...chat, pinned } : chat))
      );

      setChats(updated);

      if (pinned) {
        setSelectedChatId(chatId);
        return;
      }

      const firstPinned = updated.find((chat) => chat.pinned);
      setSelectedChatId(firstPinned?.id ?? updated[0]?.id ?? null);
    },
    [chats]
  );

  const chatsWithMessages: ChatPreviewType[] = useMemo(
    () =>
      chats.map((chat) => {
        const lastMsg = getLastMessage(chat, messages);

        if (!lastMsg) return { ...chat, content: '' };

        return {
          ...chat,
          content: lastMsg.content,
          createdAt: lastMsg.createdAt,
        };
      }),
    [chats, messages]
  );

  return {
    chats: chatsWithMessages,
    selectedChatId,
    setSelectedChatId,
    handleChatDeleted,
    handlePinToggle,
  };
};
