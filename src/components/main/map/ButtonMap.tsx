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
    <button
      type="button"
      onClick={handleClick}
      className="w-12 h-12 flex items-center justify-center bg-[var(--map-btn-bg)] cursor-pointer  border-[var(--map-btn-bg)] rounded-sm p-0 hover:bg-btn-hover active:bg-btn-hover outline-none focus-visible:border-btn-hover aria-invalid:border-destructive transition-all duration-500 disabled:pointer-events-none"
    >
      <span className="text-[var(--map-btn-icon)] flex items-center justify-center">
        {children}
      </span>
    </button>
  );
};
