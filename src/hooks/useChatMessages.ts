import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { MessageType } from '@/types/chatType';

interface UseMessagesReturn {
  messages: MessageType[];
  preparedMessages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  addMessage: (message: MessageType) => void;
}

export const useChatMessages = (
  initialMessages: MessageType[],
  selectedChatId: string | null,
  userId: number
): UseMessagesReturn => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);

  const preparedMessages = useMemo(() => {
    if (!selectedChatId) return [];

    return messages
      .filter((msg) => msg.roomId === selectedChatId)
      .map((msg) => ({
        ...msg,
        isCurrentUser: msg.senderId === userId,
      }));
  }, [messages, selectedChatId, userId]);

  const addMessage = (message: MessageType): void => {
    setMessages((prev) => [...prev, message]);
  };

  return {
    messages,
    preparedMessages,
    setMessages,
    addMessage,
  };
};
