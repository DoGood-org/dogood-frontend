import { JSX } from 'react';

type Props = {
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'prev' | 'next';
  ariaLabel?: string;
};
export const SwiperNavButton = (props: Props): JSX.Element => {
  if (!props.icon) {
    return (
      <button
        className={`${props.className} cursor-pointer hover:scale-125`}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props.ariaLabel}
      >
        {props.icon}
      </button>
    );
  }
  return <></>;
};
