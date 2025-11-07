import React from 'react';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
};

const UserAuthIcon: React.FC<Props> = ({
  className,
  fill = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 34 36"
    fill={fill}
    className={`w-[34px] h-[36px] md:w-[56px] md:h-[60px] ${className}`}
  >
    <path
      d="M8.5 8.30769C8.5 3.6 12.1833 0 17 0C21.8167 0 25.5 3.6 25.5 8.30769C25.5 13.0154 21.8167 16.6154 17 16.6154C12.1833 16.6154 8.5 13.0154 8.5 8.30769ZM17 22.1538C3.96667 22.1538 0 31.2923 0 31.2923V36H34V31.2923C34 31.2923 30.0333 22.1538 17 22.1538Z"
      fill={fill}
    />
  </svg>
);
export default UserAuthIcon;
