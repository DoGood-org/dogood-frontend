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
    <button
      type="button"
      onClick={onClick}
      className={`mx-auto p-1  transition ${className}`}
    >
      <ChevronDown
        className={`mx-auto w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
};
