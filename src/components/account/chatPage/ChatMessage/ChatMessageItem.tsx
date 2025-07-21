import { cn } from '@/lib/utils';
import { MessageItemProps } from '@/types/chatType';
import Image from 'next/image';

export const ChatMessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <li
      className={cn(
        'flex items-start gap-4 p-5 relative w-[314px] md:w-[606px] rounded-sm mx-6',
        message.isCurrentUser
          ? 'ml-auto bg-[#3D8940] text-[#010101] dark:text-white'
          : 'mr-auto bg-tag text-white dark:bg-[#DCDCDC] dark:text-[#010101]'
      )}
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
        className={cn(
          'flex flex-col justify-between w-[210px] md:w-[506px]',
          message.isCurrentUser ? 'order-1' : 'order-2'
        )}
      >
        <p className="text-base">{message.text}</p>
        <span className="text-xs self-end mt-3">
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
