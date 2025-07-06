import { JSX } from 'react';

type Props={
  onClickHandler: () => void;
  children?: JSX.Element|string;
}
export const ButtonZoom = ({ onClickHandler, children }: Props): JSX.Element => {



  return (
    <button
      type="button"
      onClick={onClickHandler}
      className="z-150 w-11 h-11 flex items-center justify-center  bg-[var(--map-btn-bg)] cursor-pointer  border-[var(--map-btn-border)] rounded-sm"
    >
      <span className="text-[var(--map-btn-icon)] text-2xl">
        {children}
      </span>
    </button>
  );
};
