import { MessageItemProps } from '@/types/chatType';
import Image from 'next/image';

export const ChatMessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <li
      className={`flex items-start gap-4 p-5 relative w-[314px] rounded-sm ${
        message.isCurrentUser ? 'ml-auto bg-[#3D8940]' : 'mr-auto bg-tag'
      }`}
    >
      <div className={`${message.isCurrentUser ? 'order-2' : 'order-1'}`}>
        <Image
          src={message.senderAvatarUrl}
          alt={`${message.senderNickname} avatar`}
          width={42}
          height={42}
          className="w-[42px] h-[42px] rounded-full object-cover bg-white shrink-0"
        />
      </div>

      <div
        className={`flex flex-col justify-between ${
          message.isCurrentUser ? 'order-1' : 'order-2'
        }`}
      >
        <p className="w-[210px] text-base text-foreground">{message.text}</p>
        <span className="text-xs self-end text-foreground mt-3">
          {message.createdAt
            ? new Date(message.createdAt).toLocaleTimeString('uk-UA', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            : ''}
        </span>
      </div>
    </li>
  );
};
