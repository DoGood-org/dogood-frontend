import { MessagesListProps } from '@/types/chatType';
import { ChatMessageItem } from './ChatMessageItem';

export const ChatMessageList: React.FC<MessagesListProps> = ({ messages }) => {
  console.log('messages:', messages);
  return (
    <ul className="flex flex-col gap-6 mt-[24px] mb-[24px]">
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
};
