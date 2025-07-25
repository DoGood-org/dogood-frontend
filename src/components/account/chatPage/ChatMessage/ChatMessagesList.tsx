import { MessagesListProps } from '@/types/chatType';
import { ChatMessageItem } from './ChatMessageItem';

export const ChatMessageList: React.FC<MessagesListProps> = ({ messages }) => {
  console.log('messages:', messages);

  return (
    <div className="flex flex-col flex-grow min-w-0 w-full">
      {messages.length === 0 ? (
        <p className="w-[318px] text-black text-center mt-6 md:w-[608px]">
          Немає повідомлень
        </p>
      ) : (
        <ul className="flex flex-col gap-6 mt-6">
          {messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}
        </ul>
      )}
    </div>
  );
};
