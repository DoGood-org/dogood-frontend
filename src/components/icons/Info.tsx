import type { SVGProps } from 'react';
const Info = (props: SVGProps<SVGSVGElement>) => (
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.25 11.25A.75.75 0 0 1 12 12v3.75a.75.75 0 0 0 .75.75"
      />
      <path
        fill="currentColor"
        d="M11.625 9a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25"
      />
    </g>
  </svg>
);
export default Info;
