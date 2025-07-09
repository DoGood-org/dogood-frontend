import { JSX } from 'react';

type Props = {
  onClickHandler: () => void;
  children?: JSX.Element | string;
};
export const ButtonZoom = ({
  onClickHandler,
  children,
}: Props): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    onClickHandler();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="z-551 w-12 h-12 flex items-center justify-center  bg-[var(--map-btn-bg)] cursor-pointer  border-[var(--map-btn-border)] rounded-sm"
    >
      <span className="text-[var(--map-btn-icon)] text-2xl">{children}</span>
    </button>
  );
};
