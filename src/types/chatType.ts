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
