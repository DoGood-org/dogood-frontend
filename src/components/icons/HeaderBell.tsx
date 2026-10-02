import type { SVGProps } from 'react';
const HeaderBell = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="#FFFCFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#prefix__a)"
    >
      <path d="M9 18a3 3 0 0 0 6 0M5.25 9.75a6.75 6.75 0 0 1 13.5 0c0 3.358.777 6.056 1.396 7.125A.75.75 0 0 1 19.5 18h-15a.75.75 0 0 1-.645-1.125c.618-1.069 1.395-3.768 1.395-7.125" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default HeaderBell;
