import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';

type Props = {
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
};

export const ButtonOpenTasks = ({
  className = '',
  onClick,
  isOpen = false,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mx-auto p-1 rounded transition ${className}`}
    >
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
};