import type { SVGProps } from 'react';
const TimeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#prefix__a)">
      <path
        stroke="#999"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12.75c-.382 4.62-4.282 8.25-9 8.25a9 9 0 0 1-9-9c0-4.718 3.63-8.618 8.25-9"
      />
      <path
        stroke="#999"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.75V12h5.25"
      />
      <path
        fill="#999"
        d="M15 4.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25M18.375 6.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25M20.625 10.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default TimeIcon;
