export interface ChatType {
  id: string;
  name: string;
  avatar: string;
  content: string;
  createdAt: string;
  pinned?: boolean;
}

export interface ChatCardProps {
  chat: ChatType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onChatDeleted: (chatId: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
}

export interface ChatCardsListProps {
  chats: ChatType[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  onChatDeleted: (chatId: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
}

export interface MessageType {
  id: string;
  name: string;
  avatar: string;
  content: string;
  createdAt: string;
  roomId: string;
  senderId: number;
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
