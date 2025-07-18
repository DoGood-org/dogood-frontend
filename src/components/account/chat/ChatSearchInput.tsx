import SvgSearch from '@/components/icons/Search';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

type ChatInputProps = {
  selectedName: string;
  lastMessageTime: string;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

export const ChatSearchInput: React.FC<ChatInputProps> = ({
  selectedName,
  lastMessageTime,
  inputValue = '',
  onInputChange = (): void => {},
  placeholder = 'Search...',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full gap-4 px-4 py-2',
        className
      )}
    >
      {/* Ліва частина: ім’я та час */}
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-base truncate">{selectedName}</span>
        <span className="text-xs text-muted-foreground truncate">
          {lastMessageTime}
        </span>
      </div>

      {/* Input з нижнім бордером */}
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

      {/* Іконка Search */}
      <div className="text-xl text-muted-foreground cursor-pointer">
        <SvgSearch />
      </div>
    </div>
  );
};
