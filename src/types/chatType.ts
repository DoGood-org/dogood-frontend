export interface ChatType {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  pinned?: boolean;
  unreadCount?: number;
}

export interface ChatPreviewType extends ChatType {
  content?: string;
  createdAt: string;
}

export interface ChatCardProps {
  chat: ChatPreviewType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onChatDeleted: (chatId: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
  unreadCount?: number;
  showEllipsisMenu?: boolean;
}

export interface ChatCardsListProps {
  chats: ChatType[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  onChatDeleted: (chatId: string) => void;
  onPinToggle: (chatId: string, pinned: boolean) => void;
  showEllipsisMenu?: boolean;
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
  isRead: boolean;
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
