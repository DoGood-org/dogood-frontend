import { cn } from '@/lib/utils';
import { MessageItemProps } from '@/types/chatType';
import Image from 'next/image';

export const ChatMessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <li
      className={cn(
        'flex items-start gap-3 py-3 px-6 w-[318px] relative rounded-sm md:w-[608px]',
        message.isCurrentUser
          ? 'ml-auto bg-[#3D8940] text-[#010101] dark:text-white'
          : 'mr-auto bg-tag text-white dark:bg-[#DCDCDC] dark:text-[#010101]'
      )}
    >
      <div className={message.isCurrentUser ? 'order-2' : 'order-1'}>
        <Image
          src={message.avatar}
          alt={`${message.name} avatar`}
          width={42}
          height={42}
          className="w-[42px] h-[42px] rounded-full object-cover bg-white shrink-0"
        />
      </div>
      <div
        className={cn(
          'flex flex-col justify-between flex-1 max-w-full',
          message.isCurrentUser ? 'order-1' : 'order-2'
        )}
      >
        <p className="text-base break-words">{message.content}</p>
        <span className="text-xs self-end mt-2 opacity-70">
          {new Date(message.createdAt).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </span>
      </div>
    </li>
  );
};
