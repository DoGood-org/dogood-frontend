import { LucideIcon } from 'lucide-react';
import { JSX } from 'react';

type Props = {
  className?: string;
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'prev' | 'next';
  ariaLabel?: string;
};
export const SwiperNavButton = (props: Props): JSX.Element => {
  return (
    <>
      <button
        className={`${props.className} w-full  cursor-pointer hover:scale-125 text-foreground bg-transparent flex items-center justify-center`}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props.ariaLabel}
      >
        {props.icon && <props.icon color="currentColor" size={24} />}
      </button>
    </>
  );
};
