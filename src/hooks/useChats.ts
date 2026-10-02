import { ChatPreviewType, ChatType, MessageType } from '@/types/chatType';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

interface UseChatsReturn {
  chats: ChatPreviewType[];
  selectedChatId: string | null;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | null>>;
  handleChatDeleted: (chatId: string) => void;
}

const getLastMessage = (
  chat: ChatType,
  localMessages: MessageType[]
): MessageType | null => {
  const candidates = localMessages.filter((m) => m?.roomId === chat.id);

  if (candidates.length === 0) return null;

  return candidates.reduce((latest, msg) =>
    new Date(msg.createdAt).getTime() > new Date(latest.createdAt).getTime()
      ? msg
      : latest
  );
};

export const useChats = (
  initialChats: ChatType[],
  messages: MessageType[],
  isMobileOrTablet: boolean,
  isLoading: boolean,
  urlChatId?: string | null
): UseChatsReturn => {
  const [chats, setChats] = useState<ChatType[]>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const didInitSelectionRef = useRef(false);

  useEffect(() => {
    setChats(initialChats);
  }, [initialChats]);

  useEffect(() => {
    if (isMobileOrTablet) {
      setSelectedChatId(null);
      didInitSelectionRef.current = false;
      return;
    }

    if (isLoading || didInitSelectionRef.current || chats.length === 0) return;

    didInitSelectionRef.current = true;

    const targetChatId = urlChatId || localStorage.getItem('lastChatId');

    setSelectedChatId(
      targetChatId && chats.some((chat) => chat.id === targetChatId)
        ? targetChatId
        : chats[0].id
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
  };
};
