import React from 'react';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
};

const GroupAuthIcon: React.FC<Props> = ({
  width = 102,
  height = 60,
  className = '',
  fill = 'white',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 102 60"
      fill="none"
      className={className}
    >
      <path
        d="M37 14C37 6.15385 43.0667 0 51 0C58.9333 0 65 6.15385 65 14C65 21.8462 58.9333 28 51 28C43.0667 28 37 21.8462 37 14ZM51 37C29.5333 37 23 52 23 52V60H79V52C79 52 72.4667 37 51 37Z"
        fill={fill}
      />
      <path
        d="M81 23C87.3513 23 92 18.3513 92 12C92 5.64873 87.3513 0 81 0C74.6487 0 69 5.64873 69 12C69 18.3513 74.6487 23 81 23Z"
        fill={fill}
      />
      <path
        d="M81 32C75.411 32 71.2603 33.6829 68 36C78.7123 41.0976 83 50.0732 83 51H102V45C102 44.5366 96.8356 32 81 32Z"
        fill={fill}
      />
      <path
        d="M21 23C27.3513 23 32 18.3513 32 12C32 5.64873 27.3513 0 21 0C14.6487 0 9 5.64873 9 12C9 18.3513 14.6487 23 21 23Z"
        fill={fill}
      />
      <path
        d="M21 32C26.589 32 30.7397 33.6829 34 36C23.2877 41.0976 19 50.0732 19 51H0V45C0 44.5366 5.16438 32 21 32Z"
        fill={fill}
      />
    </svg>
  );
};

export default GroupAuthIcon;
