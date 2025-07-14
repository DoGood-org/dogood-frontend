import { Button } from '@/components/ui/Button';
import { JSX } from 'react';

type Props = {
  onClickHandler: () => void;
  children?: JSX.Element | string;
};
export const ButtonMap = ({ onClickHandler, children }: Props): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    onClickHandler();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="w-12 h-12 flex items-center justify-center bg-[var(--map-btn-bg)] cursor-pointer  border-[var(--map-btn-bg)] rounded-sm p-0 "
    >
      <span className="text-[var(--map-btn-icon)] text-2xl">{children}</span>
    </Button>
  );
};
