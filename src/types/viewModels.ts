export interface ChatCardViewModel {
  id: string;
  userNickname: string;
  lastMessageText: string;
  lastMessageDate: string;
  userAvatarUrl: string;
}

export interface MessageViewModel {
  id: string;
  text: string;
  senderNickname: string;
  senderAvatarUrl: string;
  createdAt: string;
  isCurrentUser: boolean;
  chatId: string;
}
