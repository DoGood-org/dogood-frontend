import type { SVGProps } from 'react';
const Verify = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      clipPath="url(#prefix__a)"
    >
      <path d="M10.001 18.335a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667" />
      <path d="m7.5 9.999 1.667 1.666L12.5 8.332" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Verify;
