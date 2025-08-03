import { JSX } from 'react';

export const CircleAlertIcon = ({
  className = 'w-6 h-6',
  fill = 'currentColor',
}: {
  className?: string;
  fill?: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
    >
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
};
