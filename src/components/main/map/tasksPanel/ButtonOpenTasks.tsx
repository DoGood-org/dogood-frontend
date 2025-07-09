import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';
import { JSX } from 'react';

type Props = {
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
};

export const ButtonOpenTasks = ({
  className = '',
  onClick,
  isOpen = false,
}: Props): JSX.Element => {
  return (
    <Button
      type="button"
      variant={'secondary'}
      onClick={onClick}
      className={`transition py-1 w-full  flex items-center justify-center border-0  bg-[var(--map-btn-bg)] rounded-0] ${className}`}
    >
      <ChevronDown
        className={`mx-auto w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </Button>
  );
};
