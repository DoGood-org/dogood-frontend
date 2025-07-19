import { MessagesListProps } from '@/types/chatType';
import { ChatMessageItem } from './ChatMessageItem';

export const ChatMessageList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <ul className="flex flex-col">
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
};
