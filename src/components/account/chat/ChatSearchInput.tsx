import SvgSearch from '@/components/icons/Search';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { ChatInputProps } from '@/types/chatType';

export const ChatSearchInput: React.FC<ChatInputProps> = ({
  selectedName,
  lastMessageTime,
  inputValue = '',
  onInputChange = (): void => {},
  placeholder = 'was on the network at ',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full gap-4 px-4 py-2',
        className
      )}
    >
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-base truncate">{selectedName}</span>
        <span className="text-xs text-muted-foreground truncate">
          {lastMessageTime}
        </span>
      </div>

      <div className="flex-1 mx-4">
        <Input
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
          className={cn(
            'border-0 border-b border-gray-300 rounded-none px-0 py-1 w-full focus:ring-0 focus:border-black'
          )}
        />
      </div>

      <div className="text-xl text-muted-foreground cursor-pointer">
        <SvgSearch />
      </div>
    </div>
  );
};
