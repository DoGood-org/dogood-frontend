import type { SVGProps } from 'react';
const LogOut = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      clipPath="url(#prefix__a)"
    >
      <path d="M10.5 4.25h-6v16.5h6M10.5 12.5H21M17.25 8.75 21 12.5l-3.75 3.75" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="currentColor" d="M0 .5h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default LogOut;
