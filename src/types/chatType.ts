export interface ChatType {
  id: string;
  name: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface ChatCardProps {
  chat: ChatType;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export interface ChatCardsListProps {
  chats: ChatType[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
}

export interface MessageType {
  id: string;
  name: string;
  avatar: string;
  content: string;
  createdAt: string;
  roomId: string;
  isCurrentUser: boolean;
}

export interface MessagesListProps {
  messages: MessageType[];
}

export interface MessageItemProps {
  message: MessageType;
}

export type ChatInputProps = {
  selectedName: string;
  lastMessageTime: string;
  lastOnline: string;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};
