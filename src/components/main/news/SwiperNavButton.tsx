import { LucideIcon } from 'lucide-react';
import { JSX } from 'react';

type Props = {
  className?: string;
  icon?: LucideIcon | JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'prev' | 'next';
  ariaLabel?: string;
};
export const SwiperNavButton = (props: Props): JSX.Element => {
  if (!props.icon) {
    return (
      <button
        className={`${props.className} block h-4 w-4 cursor-pointer hover:scale-125 text-white`}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props.ariaLabel}
      >
        {props.icon} button
      </button>
    );
  }
  return <></>;
};
