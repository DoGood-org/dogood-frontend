import { MessageItemProps } from '@/types/chatType';
import Image from 'next/image';

export const ChatMessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <li className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
      <Image
        src={message.senderAvatarUrl}
        alt={`${message.senderNickname} avatar`}
        width={36}
        height={36}
        className="rounded-full object-cover bg-gray-300 shrink-0"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{message.senderNickname}</span>
        <span className="text-base">{message.text}</span>
      </div>
      <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
        {formatTime(message.createdAt)}
      </span>
    </li>
  );
};

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('uk-UA');
}
