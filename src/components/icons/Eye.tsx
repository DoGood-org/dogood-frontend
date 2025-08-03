import React, { JSX } from 'react';

export const Eye = ({
  className = 'w-6 h-6',
  stroke = 'currentColor',
  strokeWidth = 2,
}: {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={stroke}
      strokeWidth={strokeWidth}
      className={className}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};
