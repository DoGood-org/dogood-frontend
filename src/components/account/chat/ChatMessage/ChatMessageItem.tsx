import { MessageItemProps } from '@/types/chatType';
import Image from 'next/image';

export const ChatMessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <li
      className={`flex items-start gap-3 p-2 rounded max-w-[80%] ${
        message.isCurrentUser ? 'ml-auto bg-green-100' : 'mr-auto bg-gray-200'
      }`}
    >
      {!message.isCurrentUser && (
        <Image
          src={message.senderAvatarUrl}
          alt={`${message.senderNickname} avatar`}
          width={36}
          height={36}
          className="rounded-full object-cover bg-gray-300 shrink-0"
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{message.senderNickname}</span>
        <span className="text-base">{message.text}</span>
      </div>
      <span className="text-amber-950 text-sm whitespace-nowrap">
        {message.createdAt
          ? new Date(message.createdAt).toLocaleTimeString('uk-UA', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
          : ''}
      </span>
    </li>
  );
};
