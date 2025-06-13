import type { SVGProps } from 'react';
const Binoculars = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 101 100"
    {...props}
  >
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#prefix__a)"
    >
      <path d="M41.292 34.375h18.75M90.35 60.28 73.3 21.485a9.375 9.375 0 0 0-13.258 0v44.14M41.29 65.625V21.484a9.375 9.375 0 0 0-13.257 0L10.982 60.28" />
      <path d="M25.667 81.25c8.63 0 15.625-6.996 15.625-15.625 0-8.63-6.996-15.625-15.625-15.625-8.63 0-15.625 6.996-15.625 15.625 0 8.63 6.995 15.625 15.625 15.625M75.667 81.25c8.63 0 15.625-6.996 15.625-15.625 0-8.63-6.996-15.625-15.625-15.625-8.63 0-15.625 6.996-15.625 15.625 0 8.63 6.995 15.625 15.625 15.625" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.667 0h100v100h-100z" />
      </clipPath>
    </defs>
  </svg>
);
export default Binoculars;
