import type { SVGProps } from 'react';
const LogIn = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M2.25 12.5h10.5M9 8.75l3.75 3.75L9 16.25M12.75 4.25h6v16.5h-6" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="currentColor" d="M0 .5h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default LogIn;
