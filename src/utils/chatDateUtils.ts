import { MessageType } from '@/types/chatType';

export const formatChatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const formatChatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getLastMessageTime = (
  messages: MessageType[],
  roomId: string
): string | null => {
  const filteredMessages = messages
    .filter((msg) => msg.roomId === roomId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return filteredMessages.length > 0 ? filteredMessages[0].createdAt : null;
};
