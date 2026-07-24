import { MessageType } from '@/types/chatType';

export const formatChatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (diff < hour) {
    const minutes = Math.max(1, Math.floor(diff / minute));
    return `${minutes}m`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}h`;
  }

  if (diff < 7 * day) {
    return `${Math.floor(diff / day)}d`;
  }

  if (diff < month) {
    return `${Math.floor(diff / week)}w`;
  }

  if (date.getFullYear() === now.getFullYear()) {
    return `${Math.floor(diff / month)}m`;
  }

  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(
    date.getDate()
  ).padStart(2, '0')}.${date.getFullYear()}`;
};

export const formatChatTime = (
  dateString: string,
  showPeriod: boolean = true
): string => {
  const date = new Date(dateString);

  const rawHours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (!showPeriod) {
    const formattedHours = String(rawHours).padStart(2, '0');
    return `${formattedHours}:${minutes}`;
  }

  const period = 'AM';
  let hours = rawHours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours}:${minutes} ${period}`;
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
