export interface ChatType {
  id: string;
  userNickname: string;
  lastMessageText: string;
  lastMessageDate: string;
  userAvatarUrl: string;
}

export interface ChatCardProps {
  chat: ChatType;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export interface ChatCardsListProps {
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
}

export interface MessageType {
  id: string;
  text: string;
  senderNickname: string;
  senderAvatarUrl: string;
  createdAt: string;
  chatId: string;
}

export interface MessagesListProps {
  messages: MessageType[];
}

export interface MessageItemProps {
  message: MessageType;
}
